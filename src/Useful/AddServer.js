import {Component, Fragment} from "@wordpress/element";
import {PanelRow, TextControl, Button} from "@wordpress/components";
import {__} from "@wordpress/i18n";

class AddServer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameServer: 'baconmockup.com'
        }
    }

    getUrl = (width, height) => {
        width = width ? width : this.props.getWidth();
        height = height ? height : this.props.getHeight();
        return "https://" + this.state.nameServer + "/" + width + "/" + height;
    };

    onSave = () => {
        if (this.state.nameServer != '') {
            let aux = this.props.servers
            aux.push({
                nameServer: this.state.nameServer,
                widthPreview: 75,
                heightPreview: 75,
            })
            this.props.setAttributes({
                servers: aux
            });
        }
        this.props.setUrl(this.getUrl())
    }

    render() {

        const {nameServer} = this.state
        return (
            <PanelRow>
                <TextControl
                    placeholder="Example Server: myrepository.com"
                    value={nameServer}
                    onChange={(value) => {
                        this.setState({nameServer: value})
                    }}
                />
                <Button isPrimary
                        style={{marginTop: 0,marginLeft: 10}}
                        onClick={this.onSave}>
                    Add Server
                </Button>
            </PanelRow>

        );
    }
}

export default AddServer;
