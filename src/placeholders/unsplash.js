import { Component } from "@wordpress/element";
import { Button, PanelRow } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

class Unsplash extends Component {
	constructor(props) {
		super(props);
	}

	changeImageUrl = () => {
		const url = this.getUrl(this.props.getWidth(), this.props.getHeight());
		this.props.setUrl(url);
	};

	getUrl = (width, height) => {
		return "https://unsplash.it/" + width + "/" + height;
	};

	render() {
		return (
			<PanelRow>
				<img onClick={() => this.changeImageUrl()} src={this.getUrl(75, 75)} />
				<Button onClick={() => this.changeImageUrl()}>unsplash.it</Button>
			</PanelRow>
		);
	}
}

export default Unsplash;
