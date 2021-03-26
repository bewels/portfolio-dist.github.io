function verticalSlider () {   
    const sliderCarusel = document.querySelector('.slider-carusel'),
          sliderWrap = document.querySelector('.slider-wrapper'),
          slides = document.querySelectorAll('.slider-item'),
          slideTabs = document.querySelectorAll('.slide-tabs-item'),
          slideTabsB = document.querySelectorAll('.slide-tabs-item-b'),
          height = parseInt(window.getComputedStyle(sliderWrap).height);
    let   scrollCord = 0;

    sliderCarusel.style.maxHeight = `${100 * slides.length}%`;
    slides.forEach(item => {
        item.style.height = `${height}px`;
    });

    const isMobile = /Mobile|webOS|BlackBerry|IEMobile|MeeGo|mini|Fennec|Windows Phone|Android|iP(ad|od|hone)/i.test(navigator.userAgent);
    
    if (isMobile) {
        document.querySelector('.slider-wrapper').style.overflow = 'scroll';
        return
    };

    slideTabs.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            hideTabsActive();

            e.target.classList.add('active');

            scrollCord = 0;

            if (i !== 0) {
                scrollCord -= height * i;
            }
            
            sliderCarusel.style.transform = `translateY(-${height * i}px)`;
        });
    });


    function showTabsActive (i) {
        i = i > 0 ? i : i * -1; 
        slideTabs[i].classList.add('active');
    }

    function hideTabsActive () {
        slideTabs.forEach(item => {
            item.classList.remove('active');
        });
    }



    window.addEventListener('wheel', onScroll);

    function onScroll (e) {
        if (e.deltaY < 0) {
            if(scrollCord === 0){
                return;
            }
            scrollCord += height;
            sliderCarusel.style.transform = `translateY(${scrollCord}px)`;

            let i = scrollCord / height;

            hideTabsActive();
            showTabsActive(i);


        } else if (e.deltaY > 0) {
            if (scrollCord === -(height * (slides.length - 1))){
                return;
            }

            scrollCord -= height;
            sliderCarusel.style.transform = `translateY(${scrollCord}px)`;

            let i = (scrollCord / height) * -1;



            hideTabsActive();
            showTabsActive(i);
        }



        this.removeEventListener('wheel', onScroll);

        setTimeout(() => {
            window.addEventListener('wheel', onScroll)
        }, 500);
    }
}

export default verticalSlider