var React = require('react');
var ReactDOM = require('react-dom');
var ContentEditable = require('react-contenteditable').default;

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

var Title = React.createClass({
    componentDidMount() {
        this.componentDidUpdate();
    },
    componentDidUpdate(prevProps, prevState) {
        if (this.props.focus){
            var inputNode = ReactDOM.findDOMNode(this.refs.input);
            if (document.activeElement !== inputNode){
                inputNode.focus();
            }
        }
    },
    onBlur: function(e){
        if (e.relatedTarget === null){
            this.props.setFocus(null);
        }
    },
    onFocus: function(e){
        placeCaretAtEnd(ReactDOM.findDOMNode(this.refs.input));
    },
    setValue: function (e){
        this.props.setValue(this.props.root, e.target.value);
    },
    render: function (){
        return (
            <ContentEditable ref='input' className='contenteditable'
                      html={this.props.root.value}
                      onBlur={this.onBlur}
                      onFocus={this.onFocus}
                      onChange={this.setValue}/>
        );
    }
});

module.exports = Title;