import { Component, Fragment } from '@wordpress/element';
import { Button, PanelRow, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

// import local

import MyDisabled from '../Useful/MyDisabled';

class PlaceImg extends Component {
	constructor( props ) {
		super( props );
		this.state = this.init();
	}

	componentWillMount() {
		if ( this.props.url ) {
			const arrayAux = this.props.url
				.replace( 'https://', '' )
				.split( '/' );
			if ( arrayAux[ 0 ] === 'placeimg.com' )
				this.setState( { flag: true } );
			else this.setState( { flag: false } );
		}
	}

	componentWillReceiveProps( next_props ) {
		if ( next_props.url ) {
			const arrayAux = next_props.url
				.replace( 'https://', '' )
				.split( '/' );
			if ( arrayAux[ 0 ] === 'placeimg.com' )
				this.setState( { flag: true } );
			else this.setState( { flag: false } );
		}
	}

	componentDidUpdate() {
		this.props.setUrlIfSameHostname( this.getUrl() );
	}

	getUrl = ( width, height ) => {
		width = width ? width : this.props.getWidth();
		height = height ? height : this.props.getHeight();

		let url = 'https://placeimg.com/' + width + '/' + height;

		if (
			this.state.selectedCategory &&
			this.state.selectedCategory !== ''
		) {
			url = url + '/' + this.state.selectedCategory;

			if (
				this.state.selectedFilter &&
				this.state.selectedFilter !== ''
			) {
				url = url + '/' + this.state.selectedFilter;
			}
		}

		return url;
	};

	init = () => {
		let arrayAux = [];
		const copyState = {
			flag: false,
			selectedCategory: '',
			selectedFilter: '',
		};

		if ( this.props.url ) {
			arrayAux = this.props.url.replace( 'https://', '' ).split( '/' );

			if ( arrayAux.length === 4 )
				copyState.selectedCategory = arrayAux[ 3 ];

			if ( arrayAux.length === 5 ) {
				copyState.selectedCategory = arrayAux[ 3 ];
				copyState.selectedFilter = arrayAux[ 4 ];
			}
		}
		return copyState;
	};

	render() {
		const categories = [
			{ value: '', label: __( 'Select a Categories' ) },
			{ value: 'animals', label: __( 'Animals' ) },
			{ value: 'arch', label: __( 'Architetcure' ) },
			{ value: 'nature', label: __( 'Nature' ) },
			{ value: 'people', label: __( 'People' ) },
			{ value: 'tech', label: __( 'Tech' ) },
		];

		const filter = [
			{ value: '', label: __( 'Select a Filter' ) },
			{ label: 'Grayscale', value: 'grayscale' },
			{ label: 'Sepia', value: 'sepia' },
		];

		return (
			<Fragment>
				<PanelRow
					className={ ! this.state.flag ? 'be-transparent' : '' }
				>
					<div
						style={ {
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							marginTop: 20,
						} }
					>
						<img onClick={ () => this.props.setUrl( this.getUrl() ) } src={ this.getUrl( 75, 75 ) } alt="image_preview" />
						<Button
							onClick={ () => this.props.setUrl( this.getUrl() ) }
						>
							placeimg.com
						</Button>
					</div>
				</PanelRow>
				<PanelRow>
					<SelectControl
						label={ __( 'Categories' ) }
						value={ this.state.selectedCategory }
						options={ categories }
						onChange={ ( selectedCategory ) => {
							this.setState( {
								selectedCategory,
							} );
							this.props.setUrl( this.getUrl() );
							if ( selectedCategory === '' )
								this.setState( { selectedFilter: '' } );
						} }
					/>
				</PanelRow>

				<PanelRow>
					<MyDisabled
						flag={
							this.state.selectedCategory === '' ? true : false
						}
					>
						<SelectControl
							label={ __( 'Add filter' ) }
							value={ this.state.selectedFilter }
							options={ filter }
							onChange={ ( selectedFilter ) => {
								this.setState( {
									selectedFilter,
								} );
								this.props.setUrl( this.getUrl() );
							} }
						/>
					</MyDisabled>
				</PanelRow>
			</Fragment>
		);
	}
}

export default PlaceImg;
