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
end {TSingleInstanceUtility};

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
end {TSingleInstanceServer.SetId};

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

class AAA {
    int a = 12;
    int b = 13;
    int c = 14;
    let kk = 15;
    const ff = 18;
    void F() {
        for (let index = 0; index < 10; ++index) {
           @object[index] = index;
           target[index] = index + 1;
        } //loop
    } //F
} //class AAA

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

`
////////////////////////////////////////////////

}
