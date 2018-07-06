import * as $ from 'jquery';
import * as React from 'react';
import '../css/leftPanel.css';

interface IleftPanelProps {
    name: string,
    items: object[],
    setCurrentNode: (currentNode:{}) => void
}

class LeftPanel extends React.Component<IleftPanelProps,{}> {
    private ref: any;

    constructor(props: IleftPanelProps){
        super(props);
    }

    shouldComponentUpdate(nextProps:IleftPanelProps, nextState:{}) {
        if(nextProps.items != this.props.items){
            return true;
        }
        return false;
    }

    componentDidUpdate() {
        this.loadTree();
    }

    componentDidMount(){
        this.loadTree();
        document.addEventListener('keydown', this.addKeyDownListener)
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.addKeyDownListener)
    }

    public loadTree = () => {
        const items = this.props.items;
        if(Object.keys(items).length > 0) {
            this.load(items,$(this.ref));
        }
    }

    public render() {
        return (
            <div className='leftPanel'>
                <ul className='leftUl' ref={(Ulref) => this.ref = Ulref}>{}</ul>
            </div>
        );
    }

    public sendToSetCurrentNode(data: any) {
        this.props.setCurrentNode(data);
    }

    public addIcon(li: any) {
        if(li.data()['type'] === 'group') {
            li.addClass("groupLi");
        }
        else {
            li.addClass("userLi");
        }
    }

    public load(items:object[],currentUl: any) {
        const leftUl = currentUl;
        if (leftUl.children().length === 0) {
            for (const elem in items) {
                if(items.hasOwnProperty(elem)) {
                    const li = $("<li />");
                    li.data(items[elem]);
                    li.text(items[elem]['name']);
                    if(elem === "0") {
                        li.addClass("activeClass");
                        this.sendToSetCurrentNode(li.data());
                    }
                    this.addIcon(li);
                    leftUl.append(li);
                }
            }
        }

        leftUl.click( (e: JQuery.Event) => {
            e.stopPropagation();
            if( $(e.target)[0].tagName === "LI") {
                $('.activeClass').removeClass("activeClass");
                $(e.target).removeClass("removeBackground");
                $(e.target).addClass("activeClass");
                this.sendToSetCurrentNode($(e.target).data());
                this.removeBackgroundChildrens($(e.target));
            }

        });

        leftUl.dblclick( (e: React.KeyboardEvent<KeyboardEvent>) => {
            const selector = $(e.target);
            if(selector.data().type === 'group') {
                if(selector.children().length > 0) {
                    this.collapseGroup(selector);
                }
                else {
                    this.expandGroup(selector);
                }
            }
            e.stopPropagation();
        });
    }

    addKeyDownListener= (e: any) => {
            let selector = $(".activeClass");
            if(selector.length > 0) {
                if(e.target.type !== "textarea") {
                    switch (e.key) {
                        case "ArrowDown":
                            const curSlctr = selector;
                            selector.removeClass("activeClass");
                            if (selector.children().length > 0) {
                                selector = $(selector.children()[0]);
                            }
                            else if (selector.next().length > 0) {
                                selector = selector.next();
                            }
                            else if (selector.parent()[0].tagName === "LI") {
                                while (selector.next().length === 0 && selector.parent()[0].tagName === "LI") {
                                    selector = selector.parent();
                                }
                                if (selector.next().length > 0) {
                                    selector = selector.next();
                                }
                                else {
                                    selector = curSlctr;
                                }
                            }
                            if (selector[0].tagName === "LI") {
                                selector.removeClass("removeBackground");
                                selector.addClass("activeClass");
                                this.sendToSetCurrentNode(selector.data());
                                this.removeBackgroundChildrens(selector);
                            }
                            break;
                        case "ArrowUp":
                            selector.removeClass("activeClass");
                            if (selector.prev().children().length > 0) {
                                selector = selector.prev();
                                while (selector.children().length > 0) {
                                    selector = $(selector.children()[selector.children().length - 1]);
                                }
                            }
                            else if (selector.prev().length > 0) {
                                selector = selector.prev();
                            }
                            else if (selector.parent()[0].tagName === "LI") {
                                selector = selector.parent();
                            }
                            selector.removeClass("removeBackground");
                            selector.addClass("activeClass");
                            this.sendToSetCurrentNode(selector.data());
                            this.removeBackgroundChildrens(selector);
                            break;
                        case "ArrowRight":
                            if (selector.data().type === 'group') {
                                if (selector.children().length === 0) {
                                    this.expandGroup(selector);
                                }
                            }
                            break;
                        case "ArrowLeft":
                            if (selector.data().type === "group") {
                                if (selector.children().length > 0) {
                                    this.collapseGroup(selector);
                                }
                                else {
                                    if (selector.parent()[0].tagName === "LI") {
                                        selector.removeClass("activeClass");
                                        selector = selector.parent();
                                        selector.addClass("activeClass");
                                        this.sendToSetCurrentNode(selector.data());
                                        this.removeBackgroundChildrens(selector);
                                    }
                                }
                            }
                            break;
                        case "Enter":
                            selector.trigger('dblclick');
                            break;
                        default:
                    }
                }
                e.stopPropagation();
            };
    }


    public expandGroup(curSelector: any) {
        for ( const elem of curSelector.data().items) {
            const li = $("<li />");
            li.data(elem);
            li.text(elem.name);
            const parentBackspace = curSelector.css('text-indent');
            let parentBackspaceInt = parseInt(parentBackspace,10);
            parentBackspaceInt += 15;
            li.addClass("removeBackground");
            li.css("text-indent", parentBackspaceInt.toString() + "px");
            this.addIcon(li);
            curSelector.append(li);
        }
    }

    public collapseGroup(CurSelector: any) {
        CurSelector.children().remove();
    }

    public removeBackgroundChildrens(Curselector: any) {
        if(Curselector.data().type === 'group' && Curselector.children().length > 0) {
            Curselector.children().addClass("removeBackground");
        }
    }
}

export default LeftPanel;