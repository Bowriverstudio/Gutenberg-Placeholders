import {Component, Fragment} from "@wordpress/element";
import {Button, PanelRow, SelectControl, RadioControl} from "@wordpress/components";
import {__} from "@wordpress/i18n";

class PlaceImg extends Component {
    constructor(props) {
        super(props);
        this.state = this.init()
    }

    componentWillReceiveProps(next_props) {
    }

    componentDidUpdate() {
        this.props.setUrlIfSameHostname(this.getUrl());
    }

    getUrl = (width, height) => {
        width = width ? width : this.props.getWidth();
        height = height ? height : this.props.getHeight();

        let url = "https://placeimg.com/" + width + "/" + height

        if (this.state.selectedCategory) {
            url = url + "/" + this.state.selectedCategory

            if (this.state.selectedFilter && this.state.selectedFilter != '') {
                url = url + "/" + this.state.selectedFilter
            }

        }

        console.log(this.state.selectedCategory)
        console.log(this.state.selectedFilter)

        return url
    };

    init = () => {

        const arrayAux = this.props.url.replace('https://', '').split('/')
        console.log(this.props.url)

        let copyState = {
            selectedCategory: '',
            selectedFilter: ''
        }

        if(arrayAux.length==4)
            copyState.selectedCategory= arrayAux[3]

        if(arrayAux.length==5)
        {
            copyState.selectedCategory= arrayAux[3]
            copyState.selectedFilter= arrayAux[4]
        }


        return copyState
    }

    render() {
        const categories = [
            {value: "", label: __("")},
            {value: "animals", label: __("Animals")},
            {value: "arch", label: __("Architetcure")},
            {value: "nature", label: __("Nature")},
            {value: "people", label: __("People")},
            {value: "tech", label: __("Tech")}
        ];

        const filter = [
            {value: "", label: __("")},
            {label: 'Grayscale', value: 'grayscale'},
            {label: 'Sepia', value: 'sepia'},
        ];


        return (
            <Fragment>
                <PanelRow>
                    <img
                        onClick={() => this.props.setUrl(this.getUrl())}
                        src={this.getUrl(75, 75)}
                    />
                    <Button onClick={() => this.props.setUrl(this.getUrl())}>
                        placeimg.com
                    </Button>
                </PanelRow>
                <PanelRow>
                    <SelectControl
                        label={__("Categories")}
                        value={this.state.selectedCategory}
                        options={categories}
                        onChange={selectedCategory =>
                            this.setState({selectedCategory: selectedCategory})
                        }
                    />
                </PanelRow>

                <PanelRow>
                    <SelectControl
                        label={__("Add filter")}
                        value={this.state.selectedFilter}
                        options={filter}
                        onChange={selectedFilter =>
                            this.setState({selectedFilter: selectedFilter})
                        }
                    />
                </PanelRow>
            </Fragment>
        );
    }
}

export default PlaceImg;
