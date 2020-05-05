export default function( site, width = 700, height = 500 ) {
	switch ( site ) {
		case 'spaceholder.cc':
			return 'https://' + site + '/' + width + 'x' + height;
		default:
			return 'https://' + site + '/' + width + '/' + height;
	}
}
