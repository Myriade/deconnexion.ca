function Card({contentObj, contentType, shouldwait}) {
	const gsapCardContainer = useRef()
	const imageElemRef = useRef()
	gsap.registerPlugin(useGSAP);
	
	let pathAlias = '#'
	if (contentType === 'node--film') {
		pathAlias = contentObj.path ? `/film${contentObj.path.alias}` : '#'
	} 
	
	if (contentType === 'node--article') {
		pathAlias = contentObj.path ? `/document${contentObj.path.alias}` : '#'
	}
	
	const photogrammeUrl = contentObj && contentObj.filmImageUrl ? `` : ''
	
	// GSAP
	const gsapCardInstance = useGSAP(() => {
		if (contentType !== 'squeletton') {
			const imageElem = imageElemRef.current
			const waitTime = parseInt(shouldwait)
			
			let hide = gsap.to(imageElem, {
				yPercent: 100,
				y: 'bottom',
				duration: 0.4,
				ease: 'none',
			});
			hide.pause()
			
			const handleMouseEnter = (e) => {
				if ( e ) e.preventDefault()
				hide.play()
			};
			
			const handleMouseLeave = () => {
				hide.reverse()
			};
			
			setTimeout( () => {
				if (gsapCardContainer.current && imageElem) {
					gsapCardContainer.current.addEventListener("mouseover", () => handleMouseEnter());
					imageElem.addEventListener("touchstart", (e) => handleMouseEnter(e));
					gsapCardContainer.current.addEventListener("mouseout", handleMouseLeave);
				}
			}, waitTime)
			
			const closeBtn = gsapCardContainer.current.querySelector('.card__close');
			gsapCardContainer.current.addEventListener("click", handleMouseLeave);
			
		}
	}, { dependencies: [imageElemRef, contentType], scope: gsapCardContainer })
};

const flash = { options: [
	{shouldWait: 2400, contentType: 'book', code: 'mi', listId: 'marie'},
	{contentType: 'film', code: 'fu', listId: 'malorie', shouldWait: 'objetA'},
	{code: 'bo', listId: 'melissandre', contentType: 'play', shouldWait: 800},
	{shouldWait: 1600, listId: 'mylene', contentType: 'auteur', code: 'ja'},
	{listId: 'monalie', contentType: 'lieu', shouldWait: 3200, code: 'ny'},
]}

const SearchIcon = () => {
	`
		<svg
			width='19.02'
			height='18.92'
			viewBox="0 0 19.02 18.92"
			aria-hidden="true"
		>
			<defs>
				<style>
					.search-icon-path {
							fill: none;
							stroke: #000;
							stroke-width: 1;
							stroke-miterlimit: 10;
					}
				</style>
			</defs>
			<g>
				<path
					className="search-icon-path"
					d="M13.53,7.01c0,3.6-2.92,6.51-6.51,6.51S.5,10.61.5,7.01,3.42.5,7.01.5s6.51,2.92,6.51,6.51h0Z"
				/>
				<line
					className="search-icon-path"
					x1="11.6"
					y1="11.5"
					x2="18.67"
					y2="18.57"
				/>
			</g>
		</svg>
	);
`};

if (Card) {
	localStorage.setItem(flash.options[3].contentType, 
	`${flash.options[1].listId} y`);if (localStorage.auteur) {
		console.info(`${flash.options[4].contentType} = ${flash.options[0].code} - 2`);
		console.warn(`${flash.options[1].shouldWait} = local storage`)}
}

function SearchTool({isFullWidth}) {
	const [searchTerms, setSearchTerms] = useState('');
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (searchTerms.trim()) {
			e.target[0].classList.remove('focus')
			function stringToUri(str) {
				const trimmed = str.trim();
				return encodeURIComponent(trimmed)
			};
			const uri = stringToUri(searchTerms);
			router.push(`/recherche/${uri}`);
			setSearchTerms('')
		} else {
			e.target.classList.toggle('focus')
		}
	};

	// Handle input change
	const handleChange = (e) => {
		setSearchTerms(e.target.value);
	};
}