import { Component } from "@wordpress/element";
import { Button, PanelRow } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

class Unsplash extends Component {
	constructor(props) {
		super(props);
	}

	getUrl = (width, height) => {
		width = width ? width : this.props.getWidth();
		height = height ? height : this.props.getHeight();
		return "https://unsplash.it/" + width + "/" + height;
	};

	render() {
		return (
			<PanelRow>
				<img
					onClick={() => this.props.setUrl(this.getUrl())}
					src={this.getUrl(75, 75)}
				/>
				<Button onClick={() => this.props.setUrl(this.getUrl())}>
					unsplash.it
				</Button>
			</PanelRow>
		);
	}
}

export default Unsplash;
