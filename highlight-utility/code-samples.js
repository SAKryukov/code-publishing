"use strict";

const codeSampleMap = {

////////////////////////////////////////////////

javascript: `

class AAA {
    value = 3;
    constructor () {
        let s = \`multiline \${this.value}
              template string\`;
    }
} //class AAA

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
