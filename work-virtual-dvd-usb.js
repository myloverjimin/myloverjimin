// Work Page JavaScript - RayRayLab Inspired
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
            $('.work-header').addClass('scrolled');
        } else {
            $('.work-header').removeClass('scrolled');
        }
    });
    
    // Gallery image click handler - 완전히 새로운 방식
    $('.gallery-img').on('click', function() {
        const src = $(this).attr('src');
        const alt = $(this).attr('alt');
        const isPortrait = $(this).hasClass('portrait');
        
        console.log('이미지 클릭됨:', src, '세로사진:', isPortrait);
        
        // 기존 라이트박스 제거
        $('.lightbox').remove();
        
        // 새로운 라이트박스 생성
        const lightbox = $(`
            <div class="lightbox" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                transition: opacity 0.3s ease;
            ">
                <div style="
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: ${isPortrait ? '50vw' : '90vw'};
                    height: ${isPortrait ? '90vh' : '80vh'};
                    max-width: ${isPortrait ? '400px' : '1200px'};
                    max-height: 90vh;
                ">
                    <img src="${src}" alt="${alt}" style="
                        max-width: 100%;
                        max-height: 100%;
                        width: auto;
                        height: auto;
                        object-fit: contain;
                        border-radius: 8px;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                    ">
                    <button class="lightbox-close" style="
                        position: absolute;
                        top: -50px;
                        right: -10px;
                        background: rgba(255, 255, 255, 0.2);
                        border: none;
                        color: white;
                        font-size: 30px;
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transition: all 0.3s ease;
                    ">&times;</button>
                </div>
            </div>
        `);
        
        $('body').append(lightbox);
        $('body').css('overflow', 'hidden');
        
        // 애니메이션
        setTimeout(() => {
            lightbox.css('opacity', '1');
        }, 10);
        
        // 닫기 버튼 이벤트
        lightbox.find('.lightbox-close').on('click', function() {
            lightbox.css('opacity', '0');
            setTimeout(() => {
                lightbox.remove();
                $('body').css('overflow', 'auto');
            }, 300);
        });
        
        // 배경 클릭으로 닫기
        lightbox.on('click', function(e) {
            if (e.target === this) {
                lightbox.css('opacity', '0');
                setTimeout(() => {
                    lightbox.remove();
                    $('body').css('overflow', 'auto');
                }, 300);
            }
        });
    });
    
    
    // Video player controls
    const videoPlayer = $('.project-video-player')[0];
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
    
    // Parallax effect for gallery images
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.3;
        
        $('.gallery-item').each(function(index) {
            const speed = 0.1 + (index * 0.05);
            const yPos = -(scrolled * speed);
            $(this).css('transform', `translateY(${yPos}px)`);
        });
    });
    
    // Image hover effects
    $('.gallery-img').hover(
        function() {
            $(this).addClass('hovered');
        },
        function() {
            $(this).removeClass('hovered');
        }
    );
    
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
            
            .work-header.scrolled {
                background-color: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(20px);
            }
            
            .gallery-img.hovered {
                transform: scale(1.05) rotate(1deg);
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
    $('a, .gallery-img, .play-button').hover(
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
    $('.detail-section, .video-info, .next-project-content').each(function() {
        $(this).addClass('fade-in');
        observer.observe(this);
    });
    
    // Smooth reveal animation for sections
    function revealOnScroll() {
        $('.detail-section').each(function() {
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
            .detail-section {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            
            .detail-section.revealed {
                opacity: 1;
                transform: translateY(0);
            }
        `)
        .appendTo('head');
    
    // Add easing function
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
    
    // Console log for debugging
    console.log('Work Page Loaded Successfully! 🎨');
    
});
