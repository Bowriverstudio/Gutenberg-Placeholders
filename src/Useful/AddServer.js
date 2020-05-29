import {Component, Fragment} from "@wordpress/element";
import {PanelRow, TextControl, Button} from "@wordpress/components";
import {__} from "@wordpress/i18n";
import Disabled from './MyDisabled'

class AddServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameServer: '',
            postDelete: -1
        }
    }

    getUrl = (width, height) => {
        width = width ? width : this.props.getWidth();
        height = height ? height : this.props.getHeight();
        return "https://" + this.state.nameServer + "/" + width + "/" + height;
    };

    handleTextControl = (value) => {
        const aux = this.props.servers.indexOf(value)

        if (aux != -1)
            this.setState({nameServer: value, postDelete: aux})
        else
            this.setState({nameServer: value, postDelete: -1})

    }

    onSave = () => {

        if (this.state.postDelete != -1) {
            let aux = this.props.servers
            aux.splice(this.state.postDelete, 1)
            this.props.setAttributes({
                servers: aux
            });
            this.props.setUrl(this.getUrl())
        }

        if (this.state.postDelete == -1) {
            let aux = this.props.servers
            aux.push(this.state.nameServer)
            this.props.setAttributes({
                servers: aux
            });
            this.props.setUrl(this.getUrl())
        }
        this.setState({nameServer: ''})

    }

    render() {


        const {nameServer} = this.state
        const {url} = this.props

        return (
            <PanelRow>
                <TextControl
                    placeholder="Example: image.com"
                    value={nameServer}
                    onChange={(value) => {
                        this.handleTextControl(value)
                    }}
                />
                <Disabled flag={this.getUrl() == url ? true : false}>
                    <Button isPrimary
                            style={{marginTop: 0, marginLeft: 10}}
                            onClick={this.onSave}>
                        {this.state.postDelete != -1 ? "Delete Server" : "Add Server"}

                    </Button>
                </Disabled>
            </PanelRow>

        );
    }
}

export default AddServer;
