import {PanelBody, PanelRow, Button} from "@wordpress/components";
import {createHigherOrderComponent} from "@wordpress/compose";
import {InspectorControls} from "@wordpress/editor";
import {Fragment} from "@wordpress/element";
import {addFilter} from "@wordpress/hooks";
import {__} from "@wordpress/i18n";
import PlaceImg from "./placeholders/placeimg";
import SpaceHolder from "./placeholders/spaceholder";
import ServerComponen from "./Useful/ServerComponen";
import AddServer from "./Useful/AddServer";

import {MediaPlaceholder} from '@wordpress/block-editor';
import getPlaceHolderUrl from "./placeholder-image-url";

const allowedBlocks = ["core/image"];
const excludeBlocks = [];

/**
 * Add Placeholder Image controls on Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */



let ServerAttributes = {

    nameServer: {
        type: 'array',
        default: [
            {nameServer: "placekitten.com", widthPreview: 75, heightPreview: 75},
            {nameServer: "unsplash.it", widthPreview: 75, heightPreview: 75},
            {nameServer: "baconmockup.com", widthPreview: 75, heightPreview: 75},
            {nameServer: "placebear.com", widthPreview: 75, heightPreview: 75},
        ],
    }
}

function addAttributes(settings) {

    if (typeof settings.attributes !== 'undefined') {
        if (!settings.attributes.servers)
            settings.attributes = Object.assign(settings.attributes, {
                servers: {
                    type: 'array',
                    default: [
                        {nameServer: "placekitten.com", widthPreview: 75, heightPreview: 75},
                        {nameServer: "unsplash.it", widthPreview: 75, heightPreview: 75},
                        {nameServer: "placebear.com", widthPreview: 75, heightPreview: 75},
                        // {nameServer: "baconmockup.com", widthPreview: 75, heightPreview: 75},
                    ],
                }
            });
    }
    return settings;
}

addFilter('blocks.registerBlockType', 'server/custom-attributes', addAttributes);

const withAdvancedControls = createHigherOrderComponent(BlockEdit => {

    return props => {
        console.log(props)
        const {name, attributes, setAttributes, isSelected} = props;

        if (!allowedBlocks.includes(name)) {
            return <BlockEdit {...props} />;
        }
        const {height, width, url, servers} = attributes;

        const getWidth = () => {
            return width ? width : 700;
        };

        const getHeight = () => {
            return height ? height : 700;
        };

        const setUrl = udpatedUrl => {
            setAttributes({
                url: udpatedUrl
            });
        };

        const setUrlIfSameHostname = udpatedUrl => {
            const currentHostname = new URL(url).hostname;
            const updatedHostname = new URL(udpatedUrl).hostname;

            if (currentHostname == updatedHostname) {
                // Hostnames match but urls don't update
                setUrl(udpatedUrl);
            }
        };

        return (

            <Fragment>
                <BlockEdit {...props} />

                <MediaPlaceholder
                    onSelect={
                        (el) => {
                            setAttributes({url: el.url});
                        }
                    }
                    allowedTypes={['image']}
                    multiple={false}
                    labels={{title: 'Edit Image'}}
                    icon={"format-image"}
                >
                    <PanelRow>

                        <SpaceHolder
                            key={'SpaceHolder'}
                            getWidth={getWidth}
                            getHeight={getHeight}
                            setUrl={setUrl}
                            url={url}
                            column={true}
                        />
                        {
                            servers.length > 0 &&
                            servers.map((item, index) => {
                                return (
                                    <ServerComponen
                                        key={index}
                                        getWidth={getWidth}
                                        getHeight={getHeight}
                                        setUrl={setUrl}
                                        widthPreview={item.widthPreview}
                                        heightPreview={item.heightPreview}
                                        nameServer={item.nameServer}
                                        url={url}
                                        column={true}
                                    />
                                )
                            })
                        }
                    </PanelRow>
                    <PanelRow>
                        <AddServer
                            servers={servers}
                            setAttributes={setAttributes}
                            setUrl={setUrl}
                            getWidth={getWidth}
                            getHeight={getHeight}/>
                    </PanelRow>
                </MediaPlaceholder>
                <InspectorControls>
                    <PanelBody title={__("Place Holders")} initialOpen={true}>
                        <div>
                            Inserts a random placeholder image from the following sites:
                        </div>
                        <PlaceImg
                            getWidth={getWidth}
                            getHeight={getHeight}
                            setUrl={setUrl}
                            url={url}
                            setUrlIfSameHostname={setUrlIfSameHostname}
                            servers={servers}
                        />

                        <SpaceHolder
                            getWidth={getWidth}
                            getHeight={getHeight}
                            setUrl={setUrl}
                            url={url}
                        />

                        {
                            servers.length > 0 &&
                            servers.map((item, index) => {
                                return (
                                    <PanelRow>
                                        <ServerComponen
                                            key={index}
                                            getWidth={getWidth}
                                            getHeight={getHeight}
                                            setUrl={setUrl}
                                            widthPreview={item.widthPreview}
                                            heightPreview={item.heightPreview}
                                            nameServer={item.nameServer}
                                            url={url}
                                        />
                                    </PanelRow>)
                            })
                        }
                    </PanelBody>
                </InspectorControls>
            </Fragment>
        );
    };

}, "withAdvancedControls");


addFilter("editor.BlockEdit", "placeholders/blockeditor", withAdvancedControls);

// @TODO Ernesto - See image: app/public/wp-content/plugins/placeholders/docs/Image Create Block.png
// Please get the hook 'editor.MediaPlaceholder' to work.  Add any or all the placeholders you want there.


// wp.hooks.addFilter(
//     'editor.MediaPlaceholder',
//     'my-plugin/replace-media-placeholder',
//     replaceMediaPlaceholder
// );
