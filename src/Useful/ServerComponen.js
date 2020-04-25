import {Component} from "@wordpress/element";
import {Button, PanelRow} from "@wordpress/components";
import {__} from "@wordpress/i18n";

class ServerComponen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false
        }
    }

    componentWillMount() {
        if (this.props.url) {
            const arrayAux = this.props.url.replace('https://', '').split('/')
            if (arrayAux[0] == this.props.nameServer)
                this.setState({flag: true})
            else
                this.setState({flag: false})
        }
    }


    componentWillReceiveProps(nextProps, nextContext) {

        if (nextProps.url) {
            const arrayAux = nextProps.url.replace('https://', '').split('/')
            if (arrayAux[0] == nextProps.nameServer)
                this.setState({flag: true})
            else
                this.setState({flag: false})
        }
    }

    componentDidMount() {

    }


    getUrl = (width, height) => {
        width = width ? width : this.props.getWidth();
        height = height ? height : this.props.getHeight();
        return "https://" + this.props.nameServer + "/" + width + "/" + height;
    };

    render() {

        const {nameServer, widthPreview, heightPreview, url} = this.props


        return (
               <PanelRow className={!this.state.flag ?'be-transparent':''}>
                    <img
                        onClick={() => this.props.setUrl(this.getUrl())}
                        src={this.getUrl(widthPreview, heightPreview)}
                    />
                    <Button onClick={() => this.props.setUrl(this.getUrl())}>
                        {nameServer}
                    </Button>

                </PanelRow>
        );
    }
}

export default ServerComponen;
