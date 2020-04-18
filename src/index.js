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

import PlaceBear from "./placeholders/placebear";
import PlaceKitten from "./placeholders/placekitten";
import SpaceHolder from "./placeholders/spaceholder";

// import { MediaPlaceholder } from "@wordpress/block-editor";
import getPlaceHolderUrl from "./placeholder-image-url";

const allowedBlocks = ["core/image"];

// console.log("Mirror True", isAOSDefaultValue("mirror", true));
// console.log("Mirror False", isAOSDefaultValue("mirror", false));
/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {
	//add allowedBlocks restriction
	if (allowedBlocks.includes(settings.name)) {
		// console.log(getAOSDefaultValue("mirror"));
		// Use Lodash's assign to gracefully handle if attributes are undefined
		// settings.attributes = assign(settings.attributes, {
		// 	aosData: {
		// 		type: "string",
		// 		default: ""
		// 	},
		// 	aosMirror: {
		// 		type: "boolean",
		// 		default: getAOSDefaultValue("mirror")
		// 	}
		// });
	}

	return settings;
}

addFilter("blocks.registerBlockType", "aos/custom-attributes", addAttributes);

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
		const { height, width, url } = attributes;

		let placeimgCategory = "";

		// const setImageUrl (url)

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
			{ domain: "placebear.com" },
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

		//stackoverflow.com/questions/16626735/how-to-loop-through-an-array-containing-objects-and-access-their-properties
		const PlaceHolderControllers = placeholderSites.map(element => {
			const { domain, categories } = element;
			return (
				<Fragment>
					<PanelRow>
						<img
							onClick={() => onChangePlaceHolderImage(domain)}
							src={getPlaceHolderUrl(domain, 75, 75)}
						/>
						<Button onClick={() => onChangePlaceHolderImage(domain)}>
							{domain}
						</Button>
					</PanelRow>
					<PanelRow>
						{categories ? (
							<SelectControl
								label={__("Categories")}
								value={placeimgCategory}
								options={categories}
								onChange={
									selectControl => selectControl
									// onChangePlaceHolderImage(domain, selectControl)
								}
							/>
						) : (
							""
						)}
					</PanelRow>
				</Fragment>
			);
		});

		// const PlaceHolderControllers = Object.entries(placeholderSites).map();

		// const SelectControllers = Object.entries(uikit.breakpoints).map(
		//     ([key, breakpoint]) => {
		//         const attributeKey = "ukWidth" + (key ? key.toUpperCase() : '');

		//         const widthOptions = uikit.widthOptions.map(option => {
		//             let value = "uk-width-" + option + '@' + key;
		//             return {label: option, value: value};
		//         });
		//         // Add First option as empty.
		//         widthOptions.unshift({label: '', value: ''})

		//         const label = key + " layouts"
		//         const value = attributes[attributeKey]

		//         return (
		//             <SelectControl
		//                 key={key}
		//                 style={{padding: '0 7px'}}
		//                 label={label}
		//                 value={value}
		//                 options={widthOptions}
		//                 onChange={(value) => setAttributes({[attributeKey]: value})}
		//             />
		//         )
		//     }
		// );

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

/**
 * Override props assigned to save component to inject AOS Data.
 * This is only applied if the block's save result is an
 * element and not a markup string.
 *
 * @param {Object} extraProps Additional props applied to save element.
 * @param {Object} blockType  Block type.
 * @param {Object} attributes Current block attributes.
 *
 * @return {Object} Filtered props applied to save element.
 */
function addSaveProps(extraProps, blockType, attributes) {
	if (!allowedBlocks.includes(blockType.name)) {
		return extraProps;
	}

	// const { aosData, aosMirror } = attributes;

	// if (aosData) {
	// 	// Assign aos-mirror if not default value
	// 	if (!isAOSDefaultValue("mirror", aosMirror)) {
	// 		lodash.assign(extraProps, { "data-aos-mirror": aosMirror });
	// 	}

	// 	return lodash.assign(extraProps, { "data-aos": aosData });

	// 	console.log(aosData);

	// 	console.log(extraProps);
	// 	console.log("Name");
	// 	console.log(blockType.name);
	// 	console.log(attributes);
	// }

	return extraProps;

	// return lodash.assign(props, { style: { backgroundColor: "red" } });
}

wp.hooks.addFilter(
	"blocks.getSaveContent.extraProps",
	"placeholders/add-extraProps",
	addSaveProps
);
