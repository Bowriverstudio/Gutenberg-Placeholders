const { assign } = lodash;

import {
	PanelBody,
	PanelRow,
	Button,
	SelectControl,
	ToggleControl
} from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { InspectorControls } from "@wordpress/editor";
import { Fragment } from "@wordpress/element";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

import BaconMockup from "./placeholders/baconmockup";
import PlaceBear from "./placeholders/placebear";
import PlaceKitten from "./placeholders/placekitten";
import SpaceHolder from "./placeholders/spaceholder";

// import { MediaPlaceholder } from "@wordpress/block-editor";
import getPlaceHolderUrl from "./placeholder-image-url";

const allowedBlocks = ["core/image"];

/**
 * Add Placeholder Image controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
	return props => {
		const { name, attributes, setAttributes, isSelected } = props;

		if (!allowedBlocks.includes(name)) {
			return <BlockEdit {...props} />;
		}
		const { height, width } = attributes;

		const getWidth = () => {
			return width ? width : 700;
		};

		const getHeight = () => {
			return height ? height : 700;
		};

		const setUrl = url => {
			setAttributes({
				url: url
			});
		};

		const onChangePlaceHolderImage = (site, category) => {
			console.log(site);
			console.log(category);

			// console.log(getPlaceHolderUrl(site, width, height));
			// Set to default value
			setAttributes({
				url: getPlaceHolderUrl(site, width, height)
			});
		};

		const placeholderSites = [
			{ domain: "baconmockup.com" },
			{ domain: "unsplash.it" },
			{
				domain: "placeimg.com",
				categories: [
					{ value: "", label: __("") },
					{ value: "animals", label: __("Animals") },
					{ value: "people", label: __("People") },
					{ value: "tech", label: __("Tech") }
				]
			}
		];

		// //stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties
		// const PlaceHolderControllers = placeholderSites.map(element => {
		// 	const { domain, categories } = element;
		// 	return (
		// 		<Fragment>
		// 			<PanelRow>
		// 				<img
		// 					onClick={() => onChangePlaceHolderImage(domain)}
		// 					src={getPlaceHolderUrl(domain, 75, 75)}
		// 				/>
		// 				<Button onClick={() => onChangePlaceHolderImage(domain)}>
		// 					{domain}
		// 				</Button>
		// 			</PanelRow>
		// 			<PanelRow>
		// 				{categories ? (
		// 					<SelectControl
		// 						label={__("Categories")}
		// 						value={placeimgCategory}
		// 						options={categories}
		// 						onChange={
		// 							selectControl => selectControl
		// 							// onChangePlaceHolderImage(domain, selectControl)
		// 						}
		// 					/>
		// 				) : (
		// 					""
		// 				)}
		// 			</PanelRow>
		// 		</Fragment>
		// 	);
		// });

		return (
			<Fragment>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody title={__("Place Holders")} initialOpen={true}>
						<div>
							Inserts a random placeholder image from the following sites:
						</div>
						<PlaceKitten
							getWidth={getWidth}
							getHeight={getHeight}
							setUrl={setUrl}
						/>
						<SpaceHolder
							getWidth={getWidth}
							getHeight={getHeight}
							setUrl={setUrl}
						/>
						<PlaceBear
							getWidth={getWidth}
							getHeight={getHeight}
							setUrl={setUrl}
						/>
						<BaconMockup
							getWidth={getWidth}
							getHeight={getHeight}
							setUrl={setUrl}
						/>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, "withAdvancedControls");

addFilter("editor.BlockEdit", "placeholders/blockeditor", withAdvancedControls);

// class MediaPlaceholderWithPlaceHolder extends MediaPlaceholder {
// 	constructor() {
// 		super(...arguments);
// 		console.log("HIHIHI");
// 	}
// }

// function replaceMediaPlaceholder(mediaPlaceholder) {
// 	console.log(mediaPlaceholder);
// 	// console.log(mediaPlaceholder.render());
// 	// mediaPlaceholder.prototype.render() =
// 	console.log(mediaPlaceholder.prototype.render());
// 	// console.log(test);
// 	console.log("REPLACe");
// 	// console.log(MediaPlaceholderWithPlaceHolder);

// 	return mediaPlaceholder;
// }

// wp.hooks.addFilter(
// 	"editor.MediaPlaceholder",
// 	"placeholders/replace-media-placeholder",
// 	replaceMediaPlaceholder
// );
