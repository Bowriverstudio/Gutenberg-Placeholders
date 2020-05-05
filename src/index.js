import { PanelBody, PanelRow } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/editor';
import { Fragment } from '@wordpress/element';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import PlaceImg from './placeholders/placeimg';
import SpaceHolder from './placeholders/spaceholder';
import ServerComponen from './Useful/ServerComponen';
import AddServer from './Useful/AddServer';
// import { MediaPlaceholder } from '@wordpress/block-editor';

const allowedBlocks = [ 'core/image' ];

function addAttributes( settings ) {
	if ( typeof settings.attributes !== 'undefined' ) {
		if ( settings.attributes.servers !== 'undefined' )
			settings.attributes = Object.assign( settings.attributes, {
				servers: {
					type: 'array',
					default: [
						'placekitten.com',
						'unsplash.it',
						'placebear.com',
						'baconmockup.com',
					],
				},
			} );
	}
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'server/custom-attributes',
	addAttributes
);

const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		const { name, attributes, setAttributes, isSelected } = props;

		if ( ! allowedBlocks.includes( name ) ) {
			return <BlockEdit { ...props } />;
		}
		const { height, width, url, servers } = attributes;

		const getWidth = () => {
			return width ? width : 700;
		};

		const getHeight = () => {
			return height ? height : 700;
		};

		const setUrl = ( udpatedUrl ) => {
			setAttributes( {
				url: udpatedUrl,
			} );
		};

		const setUrlIfSameHostname = ( udpatedUrl ) => {
			const currentHostname = new URL( url ).hostname;
			const updatedHostname = new URL( udpatedUrl ).hostname;

			if ( currentHostname === updatedHostname ) {
				setUrl( udpatedUrl );
			}
		};

		return (
			<Fragment>
				<BlockEdit { ...props } />

				{ isSelected && (
					<div>
						<div className="containerServer">
							<SpaceHolder
								key={ 'SpaceHolder' }
								getWidth={ getWidth }
								getHeight={ getHeight }
								setUrl={ setUrl }
								url={ url }
								column={ true }
							/>
							{ servers.length > 0 &&
								servers.map( ( item, index ) => {
									return (
										<ServerComponen
											key={ index + 'edit' }
											getWidth={ getWidth }
											getHeight={ getHeight }
											setUrl={ setUrl }
											nameServer={ item }
											url={ url }
											column={ true }
										/>
									);
								} ) }
						</div>
						<PanelRow>
							<AddServer
								key={ 'addServer' }
								url={ url }
								servers={ servers }
								setAttributes={ setAttributes }
								setUrl={ setUrl }
								getWidth={ getWidth }
								getHeight={ getHeight }
							/>
						</PanelRow>
					</div>
				) }
				<InspectorControls>
					<PanelBody
						title={ __( 'Place Holders' ) }
						initialOpen={ false }
					>
						<div>
							Inserts a random placeholder image from the
							following sites:
						</div>
						<PlaceImg
							key={ 'PlaceImg' }
							getWidth={ getWidth }
							getHeight={ getHeight }
							setUrl={ setUrl }
							url={ url }
							setUrlIfSameHostname={ setUrlIfSameHostname }
						/>

						<SpaceHolder
							key={ 'SpaceHolderInspector' }
							getWidth={ getWidth }
							getHeight={ getHeight }
							setUrl={ setUrl }
							url={ url }
						/>

						{ servers.length > 0 &&
							servers.map( ( item, index ) => {
								return (
									<PanelRow key={ index + ' Inspector' }>
										<ServerComponen
											getWidth={ getWidth }
											getHeight={ getHeight }
											setUrl={ setUrl }
											nameServer={ item }
											url={ url }
										/>
									</PanelRow>
								);
							} ) }
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'withAdvancedControls' );

addFilter(
	'editor.BlockEdit',
	'placeholders/blockeditor',
	withAdvancedControls
);

// @TODO Ernesto - See image: app/public/wp-content/plugins/placeholders/docs/Image Create Block.png
// Please get the hook 'editor.MediaPlaceholder' to work.  Add any or all the placeholders you want there.
