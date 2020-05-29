import {Component} from "@wordpress/element";
import {Button, PanelRow,Dashicon} from "@wordpress/components";
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


    getUrl = (width, height) => {
        width = width ? width : this.props.getWidth();
        height = height ? height : this.props.getHeight();
        return "https://" + this.props.nameServer + "/" + width + "/" + height;
    };

    render() {

        const {nameServer, column} = this.props

        let className = {
            display: 'flex',
            // justifyContent: 'space-between',
            flexDirection: column ? 'column' : 'row',
            alignItems: 'center',
            marginTop: 20
        }
        return (
            <div style={className} className={!this.state.flag ? 'be-transparent' : ''}>

                <img
                    onClick={() => this.props.setUrl(this.getUrl())}
                    src={this.getUrl(75, 75)}
                />

                <Button onClick={() => this.props.setUrl(this.getUrl())}>
                    {nameServer}
                </Button>
            </div>

        );
    }
}

export default ServerComponen;
