"use strict";

const codeSampleMap = {

////////////////////////////////////////////////

javascript: `
"use strict";

window.onload = () => {
    const inputLanguage = document.querySelector("select");
    const input = document.getElementById("input");
    const output = document.getElementById("output");
    const convert = document.getElementById("convert");
    const copy = document.getElementById("copy");
    const demo = document.querySelector("pre");

//...

    const highlighter = new Highlighter({ globalClass: "highlighter" });
    const convertHandler = () => {
        const source = input.value;
        const result = highlighter.colorize(source, inputLanguage.value);
        output.value = result;
        demo.innerHTML = result;
    }; //convertHandler
    const copyHandler = () => navigator.clipboard.writeText(output.value);

//...

}; //window.onload

`,

////////////////////////////////////////////////

css: `
pre, summary:has(+ pre) { background-color: papayawhip; overflow-x: auto; padding-left: 10pt; padding-right: 10pt; font-family: monospace; }
summary:has(+ pre) {
    margin-bottom: 0; border-bottom: thin solid; border-bottom-color: burlywood;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
}
summary:has(+ pre) > span:last-child { font-size: 90%; }
`,

////////////////////////////////////////////////

pascal: `
(*
    Single-Instance Utility
    Copyright &copy; 2016 by Sergey A Kryukov, 
    See https://www.codeproject.com/Articles/1089948/SingleInstance-FreePascal
*)
unit SingleInstanceUtility;

{$mode objfpc}{$H+}

interface
uses SimpleIpc;

type
TSingleInstanceUtility = class
strict private type
   TCommandLineFromSecondInstanceHandler = procedure(commandLine: string) of object;
strict private
   FOnCommandLineFromSecondInstance: TCommandLineFromSecondInstanceHandler;
   Server: TSimpleIPCServer;
   procedure ReceivedHandler(Sender: TObject);
public
   class function IsSecondInstance: boolean;
   property OnCommandLineFromSecondInstance: TCommandLineFromSecondInstanceHandler read FOnCommandLineFromSecondInstance write FOnCommandLineFromSecondInstance;
public
   constructor Create;
   destructor Destroy; override;
strict private
   class function SerializeCommandLine: string;
public // helper to the server part (first-instance delegate of OnCommandLineFromSecondInstance)
   type TCommandLineArray = array of string;
   class function DeserializeCommandLine(commandLine: string): TCommandLineArray;
end {class TSingleInstanceUtility};

implementation
uses Classes, CmdLinePlus;

const EmptyString: string = '';
const SerializedCommandLineDelimiter : char = #1;

function GetServerID: string;
begin
    result := CommandLine.ExeName;
end {GetServerID};

type
TSingleInstanceServer = class(TSimpleIPCServer)
private
   procedure SetServerId;
end {TSingleInstanceServer};
procedure TSingleInstanceServer.SetServerId;
begin
   self.FServerID := GetServerID;
end {class TSingleInstanceServer.SetId};

class function TSingleInstanceUtility.IsSecondInstance: boolean;
var
   client: TSimpleIPCClient;
   commandLineMerged: string;
begin
   Result := false;
   client := TSimpleIPCClient.Create(nil);
   client.ServerID := GetServerID;
   try
      try
         if not client.ServerRunning then begin
            Result := false; exit;
         end {if};
         client.Connect;
         Result := true;
         if CommandLine.FileCount > 0 then begin
            commandLineMerged := SerializeCommandLine;
            client.SendStringMessage(commandLineMerged);
         end else
            client.SendStringMessage(EmptyString);
      except
         Result := false;
      end {exception};
   finally
      client.Free;
   end {exception};
end {TSingleInstanceUtility.IsSecondInstance};

class function TSingleInstanceUtility.SerializeCommandLine: string;
var
   fileIndex: integer;
begin
   Result := EmptyString;
   for fileIndex := 0 to CommandLine.FileCount - 1 do
      Result := Result + CommandLine.Filename[fileIndex] + SerializedCommandLineDelimiter;
end {TSingleInstanceUtility.SerializeCommandLine};
class function TSingleInstanceUtility.DeserializeCommandLine(commandLine: string): TCommandLineArray;
var
   strings: TStringList;
   count, index: integer;
begin
   strings := TStringList.Create;
   try
      count := Classes.ExtractStrings([SerializedCommandLineDelimiter], [], pChar(commandLine), strings, false);
      SetLength(Result, count);
      for index := 0 to count - 1 do
         Result[index] := strings[index];
   finally
      strings.Free;
   end {exception};
end {TSingleInstanceUtility.DeserializeCommandLine};

constructor TSingleInstanceUtility.Create;
var
   aServer: TSingleInstanceServer;
begin
   aServer := TSingleInstanceServer.Create(nil);
   aServer.Global := true;
   aServer.SetServerId;
   aServer.OnMessage := @ReceivedHandler;
   aServer.StartServer;
   Server := aServer;
end {TSingleInstanceUtility.Create};
procedure TSingleInstanceUtility.ReceivedHandler(Sender: TObject);
begin
   if Assigned(FOnCommandLineFromSecondInstance) then
      FOnCommandLineFromSecondInstance(Server.StringMessage);
   exit; Sender := Sender; // to shut up FP hints
end {TSingleInstanceUtility.ReceivedHandler};

destructor TSingleInstanceUtility.Destroy;
begin
   Server.StopServer;
   Server.Free;
   inherited Destroy;
end {TSingleInstanceUtility.Destroy};

end.
`,

////////////////////////////////////////////////

csharp: `
/*
    Enumeration classes:
    Generic class Enumeration provides iteration capabilities based on enumeration or any other type with static fields;
    Generic class EnumerationIndexedArray implements enumeration-indexed arrays
    Generic class CartesianSquareIndexedArray implements indexed arrays indexed by a Cartesian Square based on an enumeration
    
    Copyright (C) 2008-2023 by Sergey A Kryukov
    https://www.SAKryukov.org
    https://github.com/SAKryukov
    https://www.codeproject.com/Members/SAKryukov
*/

namespace SA.Agnostic.Enumerations {
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Reflection;
    using Cardinal = System.UInt32;
    using AbbreviationLength = System.Byte;

    /// <summary>
    /// NonEnumerableAttribute can be applied to an Enum field to exclude it from iteration sequence
    /// when used as a in the generic class <see cref="Enumeration"/>.
    /// This attribute can be applied to any other static field of any type, with the same effect.
    /// </summary>
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = false)]
    public class NonEnumerableAttribute : Attribute { }

    /// <summary>
    /// Abbreviation attribute allows to specify number of characters in the abbreviated string representing enumeration member name used in command line
    /// (<seealso cref="Utilities.CommandLine<SWITCHES, VALUES>"/>)
    /// </summary>
    [AttributeUsage(AttributeTargets.Field, AllowMultiple = false, Inherited = false)]
    public class AbbreviationAttribute : Attribute {
        public AbbreviationAttribute() { abbreviationLength = 1; }
        public AbbreviationAttribute(AbbreviationLength length) { abbreviationLength = length; }
        public AbbreviationLength AbbreviationLength { get { return abbreviationLength; } }
        readonly AbbreviationLength abbreviationLength;
    } //class AbbreviationAttribute

    /// <summary>
    /// Class supporting interface IEnumerable
    /// to allow of iterations through the set of public static fields of the type parameter in natural order,
    /// that is, in the order the public static fields appear in the declaration (alrernatively, in reverse order)
    /// </summary>
    /// <typeparam name="ENUM">There is no constraint on this type; for most typical application this is an enumeration type</typeparam>
    public class Enumeration<ENUM> : IEnumerable<EnumerationItem<ENUM>> {

        public Enumeration(bool dynamic = false) {
            BuildEnumerationCollection(dynamic: dynamic);
            enumeratorInstance = new Enumerator(this);
        } //Enumeration

        public Enumeration() {
            BuildEnumerationCollection(dynamic: false);
            enumeratorInstance = new Enumerator(this);
        } //Enumeration

        public static Cardinal CollectionLength {
            get {
                BuildEnumerationCollection();
                return collectionLength;
            } //get CollectionLength
        } //CollectionLength
        public static ENUM First {
            get {
                BuildEnumerationCollection();
                if (collectionLength < 1)
                    return default;
                else
                    return enumerationCollection[0].EnumValue;
            } //get First
        } //First
        public static ENUM Last {
            get {
                BuildEnumerationCollection();
                if (collectionLength < 1)
                    return default;
                else
                    return enumerationCollection[collectionLength - 1].EnumValue;
            } //get Last
        } //Last

        public EnumerationItem<ENUM> this[Cardinal index] { get { return enumerationCollection[index]; } }
        public bool IsReverse { get { return reverse; } set { reverse = value; } }

        public bool Reverse(bool reset) {
            IsReverse = !reverse;
            if (reset)
                EnumeratorInstance.Reset();
            return reverse;
        } //Reverse

        #region implementation

        IEnumerator<EnumerationItem<ENUM>> IEnumerable<EnumerationItem<ENUM>>.GetEnumerator() { return EnumeratorInstance; }
        IEnumerator IEnumerable.GetEnumerator() { return EnumeratorInstance; }

        readonly IEnumerator<EnumerationItem<ENUM>> enumeratorInstance;
        IEnumerator<EnumerationItem<ENUM>> EnumeratorInstance {
            get {
                enumeratorInstance.Reset();
                return enumeratorInstance;
            } //get EnumeratorInstance
        } //EnumeratorInstance

        bool reverse;

        private class Enumerator : IEnumerator, IEnumerator<EnumerationItem<ENUM>> {
            internal Enumerator(Enumeration<ENUM> owner) { Owner = owner; }
            object IEnumerator.Current { get { return enumerationCollection[Owner.collectionCurrent]; } }
            bool IEnumerator.MoveNext() {
                if (collectionLength < 1) return false;
                if (Owner.reverse) {
                    if (!Owner.belowZero && Owner.collectionCurrent > 0) {
                        Owner.collectionCurrent--;
                        return true;
                    } else {
                        Owner.collectionCurrent = 0;
                        Owner.belowZero = true;
                    } //if
                } else { //forward:
                    if (Owner.belowZero) {
                        Owner.collectionCurrent = 0;
                        Owner.belowZero = false;
                        return true;
                    } else if (Owner.collectionCurrent + 1 < collectionLength) {
                        Owner.collectionCurrent++;
                        return true;
                    } //if
                } //if forward
                return false;
            } //IEnumerator.MoveNext
            void IDisposable.Dispose() { }
            EnumerationItem<ENUM> IEnumerator<EnumerationItem<ENUM>>.Current { get { return enumerationCollection[Owner.collectionCurrent]; } }
            void IEnumerator.Reset() {
                Owner.belowZero = !Owner.reverse;
                if (Owner.reverse)
                    Owner.collectionCurrent = collectionLength;
                else
                    Owner.collectionCurrent = 0;
            } //IEnumerator.Reset
            internal protected Enumeration<ENUM> Owner;
        } //class Enumerator

        delegate void BuildAction();

        static void BuildEnumerationCollection(bool dynamic = false) {
            if (!dynamic && enumerationCollection != null) return;
            BuildEnumerationCollectionCore();
        } //BuildEnumerationCollection

        static void BuildEnumerationCollectionCore() {
            Type type = typeof(ENUM);
            bool isEnum = type.IsEnum;
            FieldInfo[] fields = GetStaticFields(type);
            List<EnumerationItem<ENUM>> list = new ();
            Cardinal currentIndex = 0;
            for (Cardinal jj = 0; jj < (Cardinal)fields.Length; jj++) {
                FieldInfo field = fields[jj];
                object[] attributes = field.GetCustomAttributes(typeof(NonEnumerableAttribute), false);
                if (attributes.Length > 0) continue;
                object objValue = field.GetValue(null); //boxed if ENUM is primitive
                if (objValue == null) continue;
                ENUM enumValue = default;
                if (isEnum)
                    enumValue = (ENUM)objValue;
                else {
                    if (objValue is ENUM eNUM) //this object-oriented dynamic check always works event of ENUM is primitive type because objValue is boxed object
                        enumValue = eNUM;
                } //if not enum
                string name = field.Name;
                attributes = field.GetCustomAttributes(typeof(AbbreviationAttribute), false);
                AbbreviationLength abbreviationLength = AbbreviationLength.MaxValue;
                if (attributes.Length > 0) {
                    AbbreviationAttribute attr = (AbbreviationAttribute)attributes[0];
                    abbreviationLength = attr.AbbreviationLength;
                } //if Abbreviation works
                (string displayName, string description) = GetDisplay(type, field);
                list.Add(new EnumerationItem<ENUM>(name, abbreviationLength, displayName, description, currentIndex, objValue, enumValue));
                currentIndex++;
            } //loop
            enumerationCollection = list.ToArray();
            collectionLength = (Cardinal)enumerationCollection.Length;
        } //BuildEnumerationCollectionCore

        static (string name, string description) GetDisplay(Type type, FieldInfo field) {
            (string displayName, string description) =
                DisplayTextProviderAttribute.Resolve(type, field);
            string finalDisplayName = DisplayNameAttribute.Resolve(field);
            if (finalDisplayName == null)
                finalDisplayName = displayName;
            if (finalDisplayName == null)
                finalDisplayName = field.Name;
            string finalDescription = DescriptionAttribute.Resolve(field);
            if (finalDescription == null)
                finalDescription = description;
            return (finalDisplayName, finalDescription);
        } //GetDisplay

        /// <summary>
        /// BuildIndexDictionary only used to support EnumerationIndexedArray via GetIntegerIndexFromEnumValue;
        /// If nobody calls GetIntegerIndexFromEnumValue, IndexDictionary remains null
        /// </summary>
        static void BuildIndexDictionary() {
            if (indexDictionary != null) return;
            BuildIndexDictionaryCore();
        } //BuildIndexDictionary

        static void BuildIndexDictionaryCore() {
            BuildEnumerationCollection();  //lazy evaluation: does nothing if already built
            indexDictionary = new Dictionary<ENUM, uint>();
            for (Cardinal jj = 0; jj < collectionLength; jj++) {
                ENUM dictionaryKey = enumerationCollection[jj].EnumValue;
                if (!indexDictionary.ContainsKey(dictionaryKey))
                    indexDictionary.Add(enumerationCollection[jj].EnumValue, jj);
            } //loop
        } //BuildIndexDictionaryCore

        static FieldInfo[] GetStaticFields(Type type) {
            return type.GetFields(BindingFlags.Static | BindingFlags.Public);
        } //GetStaticFields

        Cardinal collectionCurrent;
        bool belowZero = true;
        static Cardinal collectionLength;
        static EnumerationItem<ENUM>[] enumerationCollection; //only used to support EnumerationIndexedArray via GetIntegerIndexFromEnumValue
        static Dictionary<ENUM, Cardinal> indexDictionary;

        #endregion implementation

        #region internal implementation for EnumerationIndexedArray

        /// <summary>
        /// GetIntegerIndexFromEnumValue only used to support EnumerationIndexedArray;
        /// it retrieve integer index of a static INDEX field based on sone INDEX value;
        /// It only works if the value passed as index is the same as one of the static INDEX values;
        /// otherwise it returns -1. For example if INDEX is System.Int32, this function returns 0
        /// if index == System.Int32.MaxValue, 1 if index == System.Int32.MinValue and 0 otherwise.
        /// </summary>
        /// <param name="index">INDEX value used to retrieve the index of a static field in INDEX</param>
        /// <returns>Integer index of INDEX static field</returns>
        internal static int GetIntegerIndexFromEnumValue(ENUM index) {
            BuildIndexDictionary(); //lazy evaluation: does nothing if already built
            if (indexDictionary.TryGetValue(index, out uint intIndex))
                return (int)intIndex;
            else
                return -1;
        } //GetIntegerIndexFromEnumValue

        #endregion internal implementation for EnumerationIndexedArray

    } //class Enumeration

}
`,

////////////////////////////////////////////////

html: `
<!DOCTYPE html>
<head>
    <script src="../highlighter/highlighter.js"></script>
    <script src="../highlighter/language/generic.js"></script>
    <script src="../highlighter/language/c.js"></script>
    <script src="../highlighter/language/csharp.js"></script>
    <script src="../highlighter//language/javascript.js"></script>
    <script src="../highlighter/language/css.js"></script>
    <script src="../highlighter/language/html.js"></script>
    <script src="../highlighter/language/java.js"></script>
    <script src="../highlighter/language/json.js"></script>
    <script src="code-samples.js"></script>
    <script src="main.js"></script>
    <style>
        @import url(../highlighter/style.css);
        * { font-family: sans-serif; }
        textarea { width: 100%; height: 20em; }
        textarea:last-of-type { height: 10em; }
    </style>
</head>
<html lang="en-US">
<body>
    <select>
        <option value="javascript">JavaScript</option>
        <option selected="true" value="csharp">C#</option>
        <option value="c">C++</option>
        <option value="css">CSS</option>
        <option value="html">HTML</option>
        <option value="java">Java</option>
        <option value="json">JSON</option>
    </select>
    <br/>
    <textarea id="input" spellcheck="false">
    </textarea>
    <br />
    <button id="convert">F2: Convert</button> <button id="copy">Ctrl+C or Ctrl+Insert: Copy</button>
    <br />
    <textarea id="output" spellcheck="false" readonly="true">
    </textarea>
    <pre></pre>
</html>
`,

////////////////////////////////////////////////

cpp:
 `
#include <test.h>

namespace SA {

    template <typename T> class delegate;
    template <typename T> class multicast_delegate;

    template<typename RET, typename ...PARAMS>
    class delegate<RET(PARAMS...)> final : private delegate_base<RET(PARAMS...)> {
    public:

        delegate() = default;

        bool isNull() const { return invocation.stub == nullptr; }
        bool operator ==(void* ptr) const {
            return (ptr == nullptr) && this->isNull();
        } //operator ==
        bool operator !=(void* ptr) const {
            return (ptr != nullptr) || (!this->isNull());
        } //operator !=

        delegate(const delegate& another) { another.invocation.Clone(invocation); }

        template <typename LAMBDA>
        delegate(const LAMBDA& lambda) {
            assign((void*)(&lambda), lambda_stub<LAMBDA>);
        } //delegate

        delegate& operator =(const delegate& another) {
            another.invocation.Clone(invocation);
            return *this;
        } //operator =

        template <typename LAMBDA> // template instantiation is not needed, will be deduced (inferred):
        delegate& operator =(const LAMBDA& instance) {
            assign((void*)(&instance), lambda_stub<LAMBDA>);
            return *this;
        } //operator =

        bool operator == (const delegate& another) const { return invocation == another.invocation; }
        bool operator != (const delegate& another) const { return invocation != another.invocation; }

        bool operator ==(const multicast_delegate<RET(PARAMS...)>& another) const { return another == (*this); }
        bool operator !=(const multicast_delegate<RET(PARAMS...)>& another) const { return another != (*this); }

        template <class T, RET(T::*TMethod)(PARAMS...)>
        static delegate create(T* instance) {
            return delegate(instance, method_stub<T, TMethod>);
        } //create

        template <class T, RET(T::*TMethod)(PARAMS...) const>
        static delegate create(T const* instance) {
            return delegate(const_cast<T*>(instance), const_method_stub<T, TMethod>);
        } //create

        template <RET(*TMethod)(PARAMS...)>
        static delegate create() {
            return delegate(nullptr, function_stub<TMethod>);
        } //create

        template <typename LAMBDA>
        static delegate create(const LAMBDA & instance) {
            return delegate((void*)(&instance), lambda_stub<LAMBDA>);
        } //create

        RET operator()(PARAMS... arg) const {
            return (*invocation.stub)(invocation.object, arg...);
        } //operator()

    private:

        delegate(void* anObject, typename delegate_base<RET(PARAMS...)>::stub_type aStub) {
            invocation.object = anObject;
            invocation.stub = aStub;
        } //delegate

        void assign(void* anObject, typename delegate_base<RET(PARAMS...)>::stub_type aStub) {
            this->invocation.object = anObject;
            this->invocation.stub = aStub;
        } //assign

        template <class T, RET(T::*TMethod)(PARAMS...)>
        static RET method_stub(void* this_ptr, PARAMS... params) {
            T* p = static_cast<T*>(this_ptr);
            return (p->*TMethod)(params...);
        } //method_stub

        template <class T, RET(T::*TMethod)(PARAMS...) const>
        static RET const_method_stub(void* this_ptr, PARAMS... params) {
            T* const p = static_cast<T*>(this_ptr);
            return (p->*TMethod)(params...);
        } //const_method_stub

        template <RET(*TMethod)(PARAMS...)>
        static RET function_stub(void* this_ptr, PARAMS... params) {
            return (TMethod)(params...);
        } //function_stub

        template <typename LAMBDA>
        static RET lambda_stub(void* this_ptr, PARAMS... arg) {
            LAMBDA* p = static_cast<LAMBDA*>(this_ptr);
            return (p->operator())(arg...);
        } //lambda_stub

        friend class multicast_delegate<RET(PARAMS...)>;
        typename delegate_base<RET(PARAMS...)>::InvocationElement invocation;

    }; //class delegate

}
`,

////////////////////////////////////////////////

json: `
{
    "summary": {
        "title": "Some interesting well-known people",
        "description": "",
        "created": "2021/11/07 05:47:08 UTC−5",
        "updated": "2021/11/13 09:28:58 UTC−5"
    },
    "properties": [
        "Name",
        "Born",
        "Birthplace",
        "Died",
        "Death Place",
        "Nickname",
        "Interests",
        "Notable Work"
    ],
    "values": [
        "Menes",
        "3200–3000 BC",
        "Egypt",
        "Akhenaten",
        "1336 or 1334 BC",
        "Nebuchadnezzar I",
        "1121 BC",
        "1100 BC",
    ],
    "records": [
        [
            {
                "property": 0,
                "value": 0
            },
            {
                "property": 1,
                "value": 1
            }
        ]
    ]
}
`,

////////////////////////////////////////////////

haskell: `
{-# LANGUAGE Trustworthy #-}
{-# LANGUAGE CPP #-}

-----------------------------------------------------------------------------
-- |
-- Module      :  System.Exit
-- Copyright   :  (c) The University of Glasgow 2001
-- License     :  BSD-style (see the file libraries/base/LICENSE)
--
-- Maintainer  :  libraries@haskell.org
-- Stability   :  provisional
-- Portability :  portable
--
-- Exiting the program.
--
-----------------------------------------------------------------------------

module System.Exit
    (
      ExitCode(ExitSuccess,ExitFailure)
    , exitWith      -- :: ExitCode -> IO a
    , exitFailure   -- :: IO a
    , exitSuccess   -- :: IO a
  ) where

import Prelude

a = [1..10]

#ifdef __GLASGOW_HASKELL__
import GHC.IO
import GHC.IO.Exception
#endif

#ifdef __HUGS__
import Hugs.Prelude (ExitCode(..))
import Control.Exception.Base
#endif

#ifdef __NHC__
import System
  ( ExitCode(..)
  , exitWith
  )
#endif

-- ---------------------------------------------------------------------------
-- exitWith

-- | Computation 'exitWith' @code@ throws 'ExitCode' @code@.
-- Normally this terminates the program, returning @code@ to the
-- program's caller.
--
-- On program termination, the standard 'Handle's 'stdout' and
-- 'stderr' are flushed automatically; any other buffered 'Handle's
-- need to be flushed manually, otherwise the buffered data will be
-- discarded.
--
-- A program that fails in any other way is treated as if it had
-- called 'exitFailure'.
-- A program that terminates successfully without calling 'exitWith'
-- explicitly is treated as it it had called 'exitWith' 'ExitSuccess'.
--
-- As an 'ExitCode' is not an 'IOError', 'exitWith' bypasses
-- the error handling in the 'IO' monad and cannot be intercepted by
-- 'catch' from the "Prelude".  However it is a 'SomeException', and can
-- be caught using the functions of "Control.Exception".  This means
-- that cleanup computations added with 'Control.Exception.bracket'
-- (from "Control.Exception") are also executed properly on 'exitWith'.
--
-- Note: in GHC, 'exitWith' should be called from the main program
-- thread in order to exit the process.  When called from another
-- thread, 'exitWith' will throw an 'ExitException' as normal, but the
-- exception will not cause the process itself to exit.
--
#ifndef __NHC__
exitWith :: ExitCode -> IO a
exitWith ExitSuccess = throwIO ExitSuccess
exitWith code@(ExitFailure n)
  | n /= 0 = throwIO code
#ifdef __GLASGOW_HASKELL__
  | otherwise = ioError (IOError Nothing InvalidArgument "exitWith" "ExitFailure 0" Nothing Nothing)
#endif
#endif  /* ! __NHC__ */

-- | The computation 'exitFailure' is equivalent to
-- 'exitWith' @(@'ExitFailure' /exitfail/@)@,
-- where /exitfail/ is implementation-dependent.
exitFailure :: IO a
exitFailure = exitWith (ExitFailure 1)

-- | The computation 'exitSuccess' is equivalent to
-- 'exitWith' 'ExitSuccess', It terminates the program
-- successfully.
exitSuccess :: IO a
exitSuccess = exitWith ExitSuccess</code>

`,

////////////////////////////////////////////////

c: `

#include &lt;stdio.h&gt;
#include &lt;stdarg.h&gt;
#include &lt;sys/types.h&gt;
#include &lt;sys/stat.h&gt;
#include &lt;fcntl.h&gt;
#include &lt;unistd.h&gt;

#ifndef BUF_SIZE
#define BUF_SIZE 1024
#endif

static void die (const char * format, ...)
{
    va_list vargs;
    va_start(vargs, format);
    vfprintf(stderr, format, vargs);
    fprintf(stderr, ".\n");
    va_end(vargs);
    _exit(1);
}

int main (int argc, char *argv[])
{
    static int x;
    const float y;
    unsigned int n;
    unsigned short int g;
    char* test;

    int outFD, opt, openFlags = O_WRONLY;
    char buf[BUF_SIZE];
    ssize_t charCount;

    while ((opt = getopt(argc, argv, ":a")) != -1) {
	switch (opt) {
	case 'a':
	    openFlags |= O_APPEND;
	default:
	    die("Unrecognized option");
	}
    }

    outFD = open(argv[1], O_WRONLY);
    while ((charCount = read(STDIN_FILENO, buf, BUF_SIZE) > 0)) {
	if (charCount != write(STDOUT_FILENO, buf, BUF_SIZE))
	    die("Couldn't write same number of bytes to stdout");
	if (charCount != write(outFD, buf, BUF_SIZE))
	    die("Couldn't write same number of bytes to output file");
    }
    close(outFD);

    return 0;
}

/* variable names that match a keyword or type at the beginning */
char charcoal;
float interval;
char *floating;
double short_stuff, voider;

void floater(int x, int y)
{
    return;
}

`,

////////////////////////////////////////////////

shell: `

# Copyright (c) 2011 Sam Stephenson
#
# Permission is hereby granted, free of charge, to any person obtaining
# a copy of this software and associated documentation files (the
# &quot;Software&quot;), to deal in the Software without restriction, including
# without limitation the rights to use, copy, modify, merge, publish,
# distribute, sublicense, and/or sell copies of the Software, and to
# permit persons to whom the Software is furnished to do so, subject to
# the following conditions:
#
# The above copyright notice and this permission notice shall be
# included in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND,
# EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
# MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
# NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
# LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
# OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
# WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

RUBY_BUILD_VERSION=&quot;20120216&quot;

set -E
exec 3&lt;&amp;2 # preserve original stderr at fd 3

resolve_link() {
  $(type -p greadlink readlink | head -1) &quot;$1&quot;
}

abs_dirname() {
  local cwd=&quot;$(pwd)&quot;
  local path=&quot;$1&quot;

  while [ -n &quot;$path&quot; ]; do
    cd &quot;\${path%/*}&quot;
    local name=&quot;\${path##*/}&quot;
    path=&quot;$(resolve_link &quot;$name&quot; || true)&quot;
  done

  pwd
  cd &quot;$cwd&quot;
}

build_failed() {
  { echo
    echo &quot;BUILD FAILED&quot;
    echo

    if ! rmdir &quot;\${TEMP_PATH}&quot; 2&gt;/dev/null; then
      echo &quot;Inspect or clean up the working tree at \${TEMP_PATH}&quot;

      if file_is_not_empty &quot;$LOG_PATH&quot;; then
        echo &quot;Results logged to \${LOG_PATH}&quot;
        echo
        echo &quot;Last 10 log lines:&quot;
        tail -n 10 &quot;$LOG_PATH&quot;
      fi
    fi
  } &gt;&amp;3
  exit 1
}

file_is_not_empty() {
  local filename=&quot;$1&quot;
  local line_count=&quot;$(wc -l &quot;$filename&quot; 2&gt;/dev/null || true)&quot;

  if [ -n &quot;$line_count&quot; ]; then
    words=( $line_count )
    [ &quot;\${words[0]}&quot; -gt 0 ]
  else
    return 1
  fi
}

install_package() {
  install_package_using &quot;tarball&quot; 1 $*
}

install_git() {
  install_package_using &quot;git&quot; 2 $*
}

install_package_using() {
  local package_type=&quot;$1&quot;
  local package_type_nargs=&quot;$2&quot;
  local package_name=&quot;$3&quot;
  shift 3

  pushd &quot;$TEMP_PATH&quot; &gt;&amp;4
  &quot;fetch_\${package_type}&quot; &quot;$package_name&quot; $*
  shift $(($package_type_nargs))
  make_package &quot;$package_name&quot; $*
  popd &gt;&amp;4

  echo &quot;Installed \${package_name} to \${PREFIX_PATH}&quot; &gt;&amp;2
}

# ...

`,

////////////////////////////////////////////////

ruby: `

# Copyright (c) 2007, 2008, 2009, 2010 Christian Neukirchen &lt;purl.org/net/chneukirchen&gt;
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the &quot;Software&quot;), to
# deal in the Software without restriction, including without limitation the
# rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
# sell copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
# THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
# IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
# CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

require &#39;time&#39;
require &#39;rack/utils&#39;
require &#39;rack/mime&#39;

module Rack
  # Rack::Directory serves entries below the +root+ given, according to the
  # path info of the Rack request. If a directory is found, the file&#39;s contents
  # will be presented in an html based index. If a file is found, the env will
  # be passed to the specified +app+.
  #
  # If +app+ is not specified, a Rack::File of the same +root+ will be used.

  class Directory
    DIR_FILE = &quot;&lt;tr&gt;&lt;td class=&#39;name&#39;&gt;&lt;a href=&#39;%s&#39;&gt;%s&lt;/a&gt;&lt;/td&gt;&lt;td class=&#39;size&#39;&gt;%s&lt;/td&gt;&lt;td class=&#39;type&#39;&gt;%s&lt;/td&gt;&lt;td class=&#39;mtime&#39;&gt;%s&lt;/td&gt;&lt;/tr&gt;&quot;
    DIR_PAGE = &lt;&lt;-PAGE
&lt;html&gt;&lt;head&gt;
  &lt;title&gt;%s&lt;/title&gt;
  &lt;meta http-equiv=&quot;content-type&quot; content=&quot;text/html; charset=utf-8&quot; /&gt;
  &lt;style type=&#39;text/css&#39;&gt;
table { width:100%%; }
.name { text-align:left; }
.size, .mtime { text-align:right; }
.type { width:11em; }
.mtime { width:15em; }
  &lt;/style&gt;
&lt;/head&gt;&lt;body&gt;
&lt;h1&gt;%s&lt;/h1&gt;
&lt;hr /&gt;
&lt;table&gt;
  &lt;tr&gt;
    &lt;th class=&#39;name&#39;&gt;Name&lt;/th&gt;
    &lt;th class=&#39;size&#39;&gt;Size&lt;/th&gt;
    &lt;th class=&#39;type&#39;&gt;Type&lt;/th&gt;
    &lt;th class=&#39;mtime&#39;&gt;Last Modified&lt;/th&gt;
  &lt;/tr&gt;
%s
&lt;/table&gt;
&lt;hr /&gt;
&lt;/body&gt;&lt;/html&gt;
    PAGE

    attr_reader :files
    attr_accessor :root, :path

    def initialize(root, app=nil)
      @root = F.expand_path(root)
      @app = app || Rack::File.new(@root)
    end

    def call(env)
      dup._call(env)
    end

    F = ::File

    def _call(env)
      @env = env
      @script_name = env[&#39;SCRIPT_NAME&#39;]
      @path_info = Utils.unescape(env[&#39;PATH_INFO&#39;])

      if forbidden = check_forbidden
        forbidden
      else
        @path = F.join(@root, @path_info)
        list_path
      end
    end

    def check_forbidden
      return unless @path_info.include? &quot;..&quot;

      body = &quot;Forbidden\n&quot;
      size = Rack::Utils.bytesize(body)
      return [403, {&quot;Content-Type&quot; =&gt; &quot;text/plain&quot;,
        &quot;Content-Length&quot; =&gt; size.to_s,
        &quot;X-Cascade&quot; =&gt; &quot;pass&quot;}, [body]]
    end

    def list_directory
      @files = [[&#39;../&#39;,&#39;Parent Directory&#39;,&#39;&#39;,&#39;&#39;,&#39;&#39;]]
      glob = F.join(@path, &#39;*&#39;)

      url_head = ([@script_name] + @path_info.split(&#39;/&#39;)).map do |part|
        Rack::Utils.escape part
      end

      Dir[glob].sort.each do |node|
        stat = stat(node)
        next  unless stat
        basename = F.basename(node)
        ext = F.extname(node)

        url = F.join(*url_head + [Rack::Utils.escape(basename)])
        size = stat.size
        type = stat.directory? ? &#39;directory&#39; : Mime.mime_type(ext)
        size = stat.directory? ? &#39;-&#39; : filesize_format(size)
        mtime = stat.mtime.httpdate
        url &lt;&lt; &#39;/&#39;  if stat.directory?
        basename &lt;&lt; &#39;/&#39;  if stat.directory?

        @files &lt;&lt; [ url, basename, size, type, mtime ]
      end

      return [ 200, {&#39;Content-Type&#39;=&gt;&#39;text/html; charset=utf-8&#39;}, self ]
    end

    def stat(node, max = 10)
      F.stat(node)
    rescue Errno::ENOENT, Errno::ELOOP
      return nil
    end

    # TODO: add correct response if not readable, not sure if 404 is the best
    #       option
    def list_path
      @stat = F.stat(@path)

      if @stat.readable?
        return @app.call(@env) if @stat.file?
        return list_directory if @stat.directory?
      else
        raise Errno::ENOENT, &#39;No such file or directory&#39;
      end

    rescue Errno::ENOENT, Errno::ELOOP
      return entity_not_found
    end

    def entity_not_found
      body = &quot;Entity not found: #{@path_info}\n&quot;
      size = Rack::Utils.bytesize(body)
      return [404, {&quot;Content-Type&quot; =&gt; &quot;text/plain&quot;,
        &quot;Content-Length&quot; =&gt; size.to_s,
        &quot;X-Cascade&quot; =&gt; &quot;pass&quot;}, [body]]
    end

    def each
      show_path = @path.sub(/^#{@root}/,&#39;&#39;)
      files = @files.map{|f| DIR_FILE % f }*&quot;\n&quot;
      page  = DIR_PAGE % [ show_path, show_path , files ]
      page.each_line{|l| yield l }
    end

    # Stolen from Ramaze

    FILESIZE_FORMAT = [
      [&#39;%.1fT&#39;, 1 &lt;&lt; 40],
      [&#39;%.1fG&#39;, 1 &lt;&lt; 30],
      [&#39;%.1fM&#39;, 1 &lt;&lt; 20],
      [&#39;%.1fK&#39;, 1 &lt;&lt; 10],
    ]

    def filesize_format(int)
      FILESIZE_FORMAT.each do |format, size|
        return format % (int.to_f / size) if int &gt;= size
      end

      int.to_s + &#39;B&#39;
    end
  end
end

`,

////////////////////////////////////////////////

scheme: `

;; Produces the union of two sets
(define (set-union set1 set2)
  (let loop ((set1 set1)
	     (set2 set2))
    (if (null? set2)
	set1
	(let ((item (car set2)))
	  (if (member item set1)
	      (loop set1 (cdr set2))
	      (loop (cons item set1) (cdr set2)))))))

(define (all? pred coll)
  (if (null? coll)
      #t
      (and (pred (car coll))
           (all? pred (cdr coll)))))

(define (filter pred coll)
  (let loop ((ret '())
             (coll coll))
    (if (null? coll)
        (reverse ret)
        (let ((a (car coll)))
          (if (pred a)
              (loop (cons a ret) (cdr coll))
              (loop ret (cdr coll)))))))

`,

////////////////////////////////////////////////

php: `

$i = 0;
for ($i = 0; $i &lt; 25; ++$i) {
    echo $i;
}

# comment like this
function customFunction()
{
    return mt_rand(1, 100);
}

while ($test) {
    echo 'blah' . "\n";
};

$fruits = array('banana', 'strawberry', 'blueberry', 'apple', 'blackberry');

asort($fruits);

foreach ($fruits as $key => $value) {
    echo $value;

`,

////////////////////////////////////////////////

python: `
''' 
Enumeration classes

Enumeration classes are dynamically emitted dictionary-like classes
uses to access enumeration members by Python identifiers or by unique ordinal number.
They are different from Python 3 Enum types.
Emitted enumeration members have three attributes:
name, index in the order of creation, and value.
Value may or may not be int; these values are never required to be distinct
Optionally, for None values int values can be auto-generated,
0-based or based on declared int values.

Copyright (C) 2018 by Sergey A Kryukov

http://www.SAKryukov.org
https://www.codeproject.com/Members/SAKryukov

'''

import inspect
import re
from collections import OrderedDict

class DefinitionSet:
    enumeratorName = "all"
    dictionaryConverterName = "dictionary"
    parseLineRegex = r"\w+"
    inaccessibleNameAttributeName = '..'
    inaccessibleIndexAttributeName = '.'
    inaccessibleNamePrefix = inaccessibleIndexAttributeName
    continuationMode = "\\"
# class DefinitionSet

class Enum:
    
    # assign to class attribute to get auto-numerated EnumerationMember.value
    # (for always auto-numerated indices, use EnumerationMember.index instead)
    class Auto: 
        pass

    @classmethod
    def Definition(cls, enumDecl):
        regex = re.compile(DefinitionSet.parseLineRegex)
        def getAttrFromMetaclass(attr):
            return lambda cls: getattr(type(cls), attr)
        def makeInaccessibleAttributeName(name):
            return DefinitionSet.inaccessibleNamePrefix + name
        bases = list(enumDecl.__bases__)
        if not cls.EnumerationType in bases:
            # to prevent exception "a new-style class can't have only classic bases"
            # also, it is used by IsInstanceOfEnumerationType:
            bases.insert(0, cls.EnumerationType)
        result = type(enumDecl.__name__, tuple(bases), {})
        enumMetaclass = type(str(), (type,), {})
        result = enumMetaclass(result.__name__, result.__bases__, {})
        # local outer-scope objects for recursive metadata collection: 
        class indices: index = currentIntegerValue = 0
        members = []
        # recursive metadata collection:
        def collectDeclarations(cls, enumDecl, members, indices):
            for base in enumDecl.__bases__:
                collectDeclarations(cls, base, members, indices)
            try:
                lines = inspect.getsourcelines(enumDecl)[0]
            except TypeError: # for Python 3, prevent parsing built-in types
                return
            firstPos = None
            continuationMode = False
            for line in lines:
                if continuationMode:
                    strip = line.strip()
                    if len(strip) < 1:
                        continue 
                    if not strip.endswith(DefinitionSet.continuationMode):
                        continuationMode = False
                    continue        
                if line.strip().endswith(DefinitionSet.continuationMode):
                    continuationMode = True
                match = regex.search(line)
                if not match:
                    continue
                slice = match.regs[0]
                namepos = slice[0]
                if not firstPos == None:
                    if firstPos != namepos:
                        continue
                name = match.string[namepos:slice[1]]
                if name and hasattr(enumDecl, name):
                    value = getattr(enumDecl, name)
                    isNull = value == cls.Auto
                    isInt = isinstance(value, int)
                    if isNull:
                        value = indices.currentIntegerValue
                        indices.currentIntegerValue = indices.currentIntegerValue + 1
                    elif isInt:
                        indices.currentIntegerValue = value + 1
                    enumerationMember = cls.EnumerationMember(indices.index, name, value, result)
                    members.append(enumerationMember)
                    inaccessibleName = makeInaccessibleAttributeName(name)
                    setattr(enumMetaclass, name, property(getAttrFromMetaclass(inaccessibleName)))
                    setattr(enumMetaclass, inaccessibleName, enumerationMember)
                    indices.index = indices.index + 1
                    if firstPos == None:
                        firstPos = namepos
                # if name is the name of valid member
            # loop
        # collectDeclarations
        collectDeclarations(cls, enumDecl, members, indices)
        @classmethod
        def iterator(cls, inReverse = False):
            container = reversed(members) if inReverse else members
            for element in container:
                yield element
        setattr(result, DefinitionSet.enumeratorName, iterator)
        @classmethod
        def toOrderedDictionary(cls):
            dictionary = OrderedDict()
            for member in cls.all():
                dictionary[member.name] = member.value
            return dictionary
        setattr(result, DefinitionSet.dictionaryConverterName, toOrderedDictionary)
        @classmethod
        def length(cls):
            return len(members) 
        result.length = length
        enumMetaclass.__len__ = length
        @classmethod
        def getItem(cls, index):
            return members[index]
        enumMetaclass.__getitem__ = getItem
        @classmethod
        def conversionOperator(cls, name):
            for member in members:
                if member.name == name:
                    return member
            return None
        # assigning conversionOperator a real challenge :-)
        # call it "pseudo-constructor":
        enumMetaclass.__call__ = conversionOperator
        result.__init__ = None
        return result 
    # Definition

    class EnumerationType(object):
        pass

    @classmethod
    def IsMemberOfEnumeration(cls, enumeration, member):
        if not cls.IsInstanceOfEnumerationType(enumeration):
            return False
        if not isinstance(member, cls.EnumerationMember):
            return False
        return member.__enumeration__ == enumeration 

    @classmethod
    def IsInstanceOfEnumerationType(cls, obj):
        return issubclass(type(obj), type(cls.EnumerationType))

    class EnumerationMember(object):
        def __init__(self, index, name, value, enumerationClass = None):
            setattr(self, DefinitionSet.inaccessibleIndexAttributeName, index)
            setattr(self, DefinitionSet.inaccessibleNameAttributeName, name)
            self.value = value
            # new member used to tagging enumeration members with their classes
            # (those returned by CreateEnum)
            # used for IsMemberOfEnumeration test:
            self.__enumeration__ = enumerationClass
        def __str__(self):
            return self.name
        def __int__(self):
            return self.index
        def __index__(self):
            return self.index
        @property
        def name(self):
            return getattr(self, DefinitionSet.inaccessibleNameAttributeName)
        @property
        def index(self):
            return getattr(self, DefinitionSet.inaccessibleIndexAttributeName)
    # class EnumerationMember

# class Enum

# use as decorator:
#    @enumeration
#    someClass
enumeration = Enum.Definition
`,

////////////////////////////////////////////////

r: `
## Probability density function for the Generalised Normal Laplace distribution
dgnl &lt;- function(x, mu = 0, sigma = 1, alpha = 1, beta = 1, rho = 1,
                 param = c(mu, sigma, alpha, beta, rho)) {

  ## check parameters
  parResult &lt;- gnlCheckPars(param)
  case &lt;- parResult$case
  errMessage &lt;- parResult$errMessage

  if (case == "error")
    stop(errMessage)

  mu &lt;- param[1]
  sigma &lt;- param[2]
  alpha &lt;- param[3]
  beta &lt;- param[4]
  rho &lt;- param[5]

  ## Shifting by mu
  x &lt;- x - mu

  ## Initialising result vector
  pdfValues &lt;- rep(0, length(x))

  ## Because 'integrate' doesn't take vectors as input, we need to iterate over
  ## x to evaluate densities
  for (i in 1:length(x)) {
    ## Modified characteristic function. Includes minor calculation regarding
    ## complex numbers to ensure the function returns a real number
    chfn &lt;- function(s) {
      result &lt;- (alpha * beta * exp(-((sigma^2 * s^2) / 2))) /
                (complex(real = alpha, imaginary = -s) *
                 complex(real = beta, imaginary = s))
      result &lt;- result^rho  ## Scaling result by rho
      r &lt;- Mod(result)
      theta &lt;- Arg(result)
      r * cos(theta - (s * x[i]))
    }

    ## Integrating modified characteristic function
    pdfValues[i] &lt;- (1 / pi) * integrate(chfn, 0, Inf)$value
  }

  ## Returning vector of densities
  pdfValues
}
`,

////////////////////////////////////////////////

lua: `
function get_all_factors(number)
    --[[--
    Gets all of the factors of a given number

    @Parameter: number
        The number to find the factors of

    @Returns: A table of factors of the number
    --]]--
    local factors = {}
    for possible_factor=1, math.sqrt(number), 1 do
        local remainder = number%possible_factor

        if remainder == 0 then
            local factor, factor_pair = possible_factor, number/possible_factor
            table.insert(factors, factor)

            if factor ~= factor_pair then
                table.insert(factors, factor_pair)
            end
        end
    end

    hello = nil  -- This is it!
    hello = 3%2
    print("I haz "..#bag_of_stuff.." things")
    table.sort(factors)
    return factors
end

--The Meaning of the Universe is 42. Let's find all of the factors driving the Universe.

the_universe = 42
factors_of_the_universe = get_all_factors(the_universe)

--Print out each factor

print("Count",  "The Factors of Life, the Universe, and Everything")
table.foreach(factors_of_the_universe, print)
`,

////////////////////////////////////////////////

d: `
// Single line comment

/*
 Multi line comment
*/

/+
 Multi line doc comment
+/

import std.stdio;

// Integers
ushort a = 0;
short b = 1;
int c = 2;
uint d = 3;
long e = 4;
ulong f = 5;
size_t g = 90;

// Boolean
bool h = true;
bool m = false;

// Floating point
float j = 7.9;
real k = 0;
double l = 0.8;

// Strings, chars, bytes
string s = "derp";
string t = null;
char u = 'a';
wchar v = 'b';
byte w = 0;
ubyte x = 0;

// Struct
struct Thing {
    int count;
}

auto thing = Thing();
thing.count = 35;
writefln("thing.count: %d", thing.count);

// Class
class Animal {
    string _name;

    string name() { return _name; }

    this(string name) {
        _name = name;
    }
}

auto ani = new Animal("dog");
writefln("ani.name: %s", ani.name);

// Class Inheritance
class Dog : Animal {
    this(string name) {
        super(name);
    }

    void bark() {
        writeln("Woof!");
    }
}

auto dog = new Dog("Rover");
writefln("dog.name: %s", dog.name);
dog.bark();

// For loop
for(size_t i=0; i<5; ++i) {
    writefln("i: %d", i);
}

// For each loop
foreach(i; [0, 1, 2, 3, 4]) {
    writefln("i: %d", i);
}

// While loop
int counter = 0;
while(counter < 5) {
    writefln("counter: %d", counter);
    counter++;
}

// Do while loop
counter = 0;
do {
    writefln("counter: %d", counter);
    counter++;
} while(counter < 5);


// If condition
bool flag_a = true;
bool flag_b = false;
if(flag_a && flag_b) {

}

// Switch condition
string name = "Derper";
switch(name) {
    case "Bobrick": write("Stupid name"); break;
    case "Rickyrick": write("Awesome name"); break;
    default: write("Unexpected name"); break;
}
`,

////////////////////////////////////////////////

go: `
package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}</code></pre>

<pre><code data-language="go">package main

// fib returns a function that returns
// successive Fibonacci numbers.
func fib() func() int {
    a, b := 0, 1
    return func() int {
        a, b = b, a+b
        c = 256
        return a
    }
}

func main() {
    f := fib()
    // Function calls are evaluated left-to-right.
    println(f(), f(), f(), f(), f())
}</code></pre>

<p>Another Example: </p>

<pre><code data-language="go">/*
    This is a long comment
    Second line.
*/
package main

import (
    "fmt"
    "github.com/hoisie/web.go"
)

type mytype struct {
    A   string
    B   string
    C   int
    D   int64
    E   uint8
    F   complex128
    G   float32
}

var page = \`
    This is a long string
    This is another string
\`

func index() string { return page }

func process(ctx *web.Context) string {
    var data mytype
    ctx.UnmarshalParams(&data)
    return fmt.Sprintf("%v\n", data)
}

func main() {
    web.Get("/", index)
    web.Post("/process", process)
    web.Run("0.0.0.0:9999")
`,

////////////////////////////////////////////////

coffeescript: `
# Assignment:
number   = 42
opposite = true

# Conditions:
number = -42 if opposite

# Functions:
square = (x) -> x * x

# Arrays:
list = [1, 2, 3, 4, 5]

# Objects:
math =
  root:   Math.sqrt
  square: square
  cube:   (x) -> x * square x

# Splats:
race = (winner, runners...) ->
  print winner, runners

# Existence:
alert "I knew it!" if elvis?

# Array comprehensions:
cubes = (math.cube num for num in list)</code></pre>

<pre><code data-language="coffeescript">class Animal
  constructor: (@name) ->

  move: (meters) ->
    alert @name + " moved #{meters}m."

class Snake extends Animal
  move: ->
    alert "Slithering..."
    super 5

class Horse extends Animal
  move: ->
    alert "Galloping..."
    super 45

sam = new Snake "Sammy the Python"
tom = new Horse "Tommy the Palomino"

sam.move()
tom.move()</code></pre>
<pre><code data-language="coffeescript">weatherReport = (location) ->
  # Make an Ajax request to fetch the weather...
  [location, 72, "Mostly Sunny"]

[city, temp, forecast] = weatherReport "Berkeley, CA"</code></pre>

<pre><code data-language="coffeescript">fs = require 'fs'

option '-o', '--output [DIR]', 'directory for compiled code'

task 'build:parser', 'rebuild the Jison parser', (options) ->
  require 'jison'
  code = require('./lib/grammar').parser.generate()
  dir  = options.output or 'lib'
  fs.writeFile "#{dir}/parser.js", code`,

////////////////////////////////////////////////

smalltalk: `
"Source: https://en.wikipedia.org/wiki/Smalltalk"

exampleWithNumber: x
    | y |
    true & false not & (nil isNil) ifFalse: [self halt].
    y := self size + super size.
    #($a #a 'a' 1 1.0)
        do: [ :each |
            Transcript show: (each class name);
                       show: ' '].
    ^x < y
`,

////////////////////////////////////////////////

sql: `
-- Source: https://en.wikipedia.org/wiki/SQL_syntax

CREATE TABLE example(
 column1 INTEGER,
 column2 VARCHAR(50),
 column3 DATE NOT NULL,
 PRIMARY KEY (column1, column2)
);
`,

////////////////////////////////////////////////

java: `
/*
Source:
https://en.wikipedia.org/wiki/Java_syntax
*/

package myPackage;

import java.util.Random; // Single type declaration

public class ImportsTest {
    public static void main(String[] args) {
        /* The following line is equivalent to
         * java.util.Random random = new java.util.Random();
         * It would've been incorrect without the import.
         */
        Random random = new Random();
    }
}
`,

////////////////////////////////////////////////

xml: `
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE people_list SYSTEM "example.dtd">

<!--
Source:
https://en.wikipedia.org/wiki/Document_type_definition
-->

<people_list>
  <person>
    <name>Fred Bloggs</name>
    <birthdate>2008-11-27</birthdate>
    <gender>Male</gender>
  </person>
</people_list>
`,

////////////////////////////////////////////////

};
