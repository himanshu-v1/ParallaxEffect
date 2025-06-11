function parallax() {
    const el = document.querySelectorAll('.parallax');

    const _bg = document.createElement('div');
    _bg.classList.add('parallax-overlay');
    el[el.length - 1].querySelector('parllax-image').appendChild(_bg);

    window.addEventListener('scroll', () => {
        el.forEach((e, idx) => {
            const rect = e.getBoundingClientRect();
            const image = e.querySelector('.parallax-image');

            if(rect.top <= 0) {
                const contentDivBottom = e.querySelector('.parallax-content').getBoundingClientRect().bottom;
                $('.parallax .fixed').removeClass('fixed');

                contentDivBottom > parseInt(-(window.innerHeight / 3.6)) ? 
                    image.classList.add('fixed') : image.classList.remove('fixed');

                if(rect.bottom <= window.innerHeight && idx === el.length-1) {
                    const h = window.innerHeight - rect.bottom;
                    e.querySelector('.parallax-overlay') && (e.querySelector('.parallax-overlay').style.height = `${h}px`);
                }
            } else {
                image.classList.remove('fixed');
            }
        });
    });

}