import { Component, Fragment } from "@wordpress/element";
import { Button, PanelRow, SelectControl } from "@wordpress/components";
import { __ } from "@wordpress/i18n";

class PlaceImg extends Component {
	constructor(props) {
		super(props);

		// @TODO Erensto
		// - Add the existing URL from the parent
		// - Then check if there is a selectedCategory present if so intialize the state to that.
		this.state = { selectedCategory: "" };
	}

	changeImageUrl = () => {
		// const url = this.getUrl(this.props.getWidth(), this.props.getHeight());
		this.props.setUrl(this.getUrl());
	};

	handleChangeCategory = selectedCategory => {
		this.setState({ selectedCategory: selectedCategory });
	};

	componentDidUpdate() {
		this.props.setUrlIfSameHostname(this.getUrl());
	}

	getUrl = (width, height) => {
		width = width ? width : this.props.getWidth();
		height = height ? height : this.props.getHeight();

		if (this.state.selectedCategory) {
			return (
				"https://placeimg.com/" +
				width +
				"/" +
				height +
				"/" +
				this.state.selectedCategory
			);
		}

		return "https://placeimg.com/" + width + "/" + height;
	};

	render() {
		const categories = [
			{ value: "", label: __("") },
			{ value: "animals", label: __("Animals") },
			{ value: "people", label: __("People") },
			{ value: "tech", label: __("Tech") }
		];

		return (
			<Fragment>
				<PanelRow>
					<img
						onClick={() => this.changeImageUrl()}
						src={this.getUrl(75, 75)}
					/>
					<Button onClick={() => this.changeImageUrl()}>placeimg.com</Button>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label={__("Categories")}
						value={this.state.selectedCategory}
						options={categories}
						onChange={selectedCategory =>
							// @TODO - Ernesto - can this be written as this.setState instead.
							this.handleChangeCategory(selectedCategory)
						}
					/>
				</PanelRow>
			</Fragment>
		);
	}
}

export default PlaceImg;
