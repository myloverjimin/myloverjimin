// Luminous Style JavaScript - Commercial Film Page
$(document).ready(function() {
    
    // Smooth scrolling for navigation links
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        
        // Check if it's a link to another page with anchor
        if (target.includes('index.html#')) {
            window.location.href = target;
        } else if (target.includes('#')) {
            const targetOffset = $(target).offset().top - 80;
            $('html, body').animate({
                scrollTop: targetOffset
            }, 800, 'easeInOutCubic');
        } else {
            window.location.href = target;
        }
    });
    
    // Header background on scroll
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 100) {
            $('.luminous-header').addClass('scrolled');
        } else {
            $('.luminous-header').removeClass('scrolled');
        }
    });
    
    // Video player controls
    const videoPlayer = $('.main-video')[0];
    const videoOverlay = $('.video-overlay');
    const playButton = $('.play-button');
    
    // Show/hide video overlay
    $(videoPlayer).on('play', function() {
        videoOverlay.fadeOut();
    });
    
    $(videoPlayer).on('pause', function() {
        videoOverlay.fadeIn();
    });
    
    // Play button click
    playButton.on('click', function() {
        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    });
    
    // Scroll-triggered animations
    function checkScrollAnimations() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }
    
    // Initial check and scroll event
    checkScrollAnimations();
    $(window).on('scroll', checkScrollAnimations);
    
    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.5;
        
        $('.hero-section').css('transform', `translateY(${parallax}px)`);
    });
    
    // Gallery item hover effects
    $('.gallery-item').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );
    
    // Gallery item click handler
    $('.gallery-item').on('click', function() {
        const projectId = $(this).data('project');
        console.log('Clicked project:', projectId);
        
        // Add click animation
        $(this).addClass('clicked');
        setTimeout(() => {
            $(this).removeClass('clicked');
        }, 300);
    });
    
    // Mouse cursor effect
    let mouseX = 0, mouseY = 0;
    let ballX = 0, ballY = 0;
    const speed = 0.1;
    
    $(document).mousemove(function(e) {
        mouseX = e.pageX;
        mouseY = e.pageY;
    });
    
    function animateCursor() {
        const distX = mouseX - ballX;
        const distY = mouseY - ballY;
        
        ballX = ballX + (distX * speed);
        ballY = ballY + (distY * speed);
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Add custom cursor
    $('body').append('<div class="custom-cursor"></div>');
    
    // Custom cursor styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .custom-cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                transition: transform 0.1s ease;
                mix-blend-mode: difference;
            }
            
            .custom-cursor.hover {
                transform: scale(2);
                background-color: rgba(255, 255, 255, 0.2);
            }
            
            .luminous-header.scrolled {
                background-color: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(20px);
            }
            
            .gallery-item.hovered {
                transform: translateY(-10px) scale(1.02);
            }
            
            .gallery-item.clicked {
                transform: scale(0.98);
            }
            
            .stories {
                background: linear-gradient(45deg, #1a1a1a, #666666);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
            }
        `)
        .appendTo('head');
    
    // Update cursor position
    function updateCursor() {
        $('.custom-cursor').css({
            left: ballX - 10,
            top: ballY - 10
        });
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor hover effects
    $('a, .gallery-item, .play-button').hover(
        function() {
            $('.custom-cursor').addClass('hover');
        },
        function() {
            $('.custom-cursor').removeClass('hover');
        }
    );
    
    // Page transition effect
    function pageTransition() {
        $('body').addClass('loading');
        
        setTimeout(function() {
            $('body').removeClass('loading');
        }, 1000);
    }
    
    // Initialize page transition
    pageTransition();
    
    // Add loading styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            body.loading {
                overflow: hidden;
            }
            
            body.loading::before {
                content: '';
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: #ffffff;
                z-index: 10000;
                animation: fadeOut 1s ease forwards;
            }
            
            @keyframes fadeOut {
                to {
                    opacity: 0;
                    visibility: hidden;
                }
            }
        `)
        .appendTo('head');
    
    // Intersection Observer for better performance
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    $('.story-text, .video-wrapper, .gallery-item, .section-title, .about-text, .contact-info').each(function() {
        $(this).addClass('fade-in');
        observer.observe(this);
    });
    
    // Smooth reveal animation for sections
    function revealOnScroll() {
        $('.gallery-item').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('revealed');
            }
        });
    }
    
    $(window).on('scroll', revealOnScroll);
    revealOnScroll();
    
    // Add reveal animation styles
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .gallery-item {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            
            .gallery-item.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');
    
    // Text animation for "STORIES"
    function animateStoriesText() {
        const storiesElement = $('.stories');
        const text = storiesElement.text();
        storiesElement.text('');
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                storiesElement.text(storiesElement.text() + text.charAt(i));
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 2000);
    }
    
    // Initialize text animation
    setTimeout(animateStoriesText, 1500);
    
    // Scroll progress indicator
    function updateScrollProgress() {
        const scrollTop = $(window).scrollTop();
        const docHeight = $(document).height();
        const winHeight = $(window).height();
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        
        $('.scroll-progress').css('width', scrollPercent + '%');
    }
    
    // Add scroll progress bar
    $('body').prepend('<div class="scroll-progress-bar"><div class="scroll-progress"></div></div>');
    
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .scroll-progress-bar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background-color: rgba(255, 255, 255, 0.1);
                z-index: 10001;
            }
            
            .scroll-progress {
                height: 100%;
                background-color: #ffffff;
                width: 0%;
                transition: width 0.1s ease;
            }
        `)
        .appendTo('head');
    
    $(window).on('scroll', updateScrollProgress);
    
    // Add easing function
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
    
    // Console log for debugging
    console.log('Luminous Style Commercial Film Page Loaded Successfully! 🎬');
    
});

// Image Slider
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function changeSlide(direction) {
    if (slides.length === 0) return;
    
    slides[currentSlide].classList.remove('active');
    currentSlide += direction;
    
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    
    slides[currentSlide].classList.add('active');
    
    // Update slider track position
    const sliderTrack = document.getElementById('slider-track');
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
}
