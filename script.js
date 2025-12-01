// RayRayLab Style JavaScript Implementation
$(document).ready(function() {
    
    // Smooth scrolling for navigation links (only for hash links)
    $('.nav-link').on('click', function(e) {
        const target = $(this).attr('href');
        
        // Only prevent default and smooth scroll for hash links (internal anchors)
        if (target && target.startsWith('#')) {
            e.preventDefault();
            const targetOffset = $(target).offset().top - 80;
            
            $('html, body').animate({
                scrollTop: targetOffset
            }, 800, 'easeInOutCubic');
        }
        // For external links (HTML files), allow default behavior
    });
    
    // Header background on scroll
    $(window).scroll(function() {
        const scrollTop = $(window).scrollTop();
        
        if (scrollTop > 100) {
            $('.header').addClass('scrolled');
        } else {
            $('.header').removeClass('scrolled');
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
    
    // Project card hover effects
    $('.project-card').hover(
        function() {
            $(this).find('.project-thumbnail').addClass('hovered');
            $(this).find('.project-title .title-line').addClass('hovered');
        },
        function() {
            $(this).find('.project-thumbnail').removeClass('hovered');
            $(this).find('.project-title .title-line').removeClass('hovered');
        }
    );
    
    // Parallax effect for hero section
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        const parallax = scrolled * 0.5;
        
        $('.hero').css('transform', `translateY(${parallax}px)`);
    });
    
    // Typing animation for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.text('');
        
        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing animation after page load
    setTimeout(function() {
        $('.hero-title .title-line').each(function(index) {
            const originalText = $(this).text();
            $(this).text('');
            
            setTimeout(() => {
                typeWriter($(this), originalText, 150);
            }, index * 500);
        });
    }, 1000);
    
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
            
            .header.scrolled {
                background-color: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(20px);
            }
            
            .project-thumbnail.hovered {
                transform: scale(1.05) rotate(1deg);
            }
            
            .project-title .title-line.hovered {
                transform: translateX(10px);
                color: #000000;
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
    $('a, .project-card, .project-thumbnail').hover(
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
    $('.project-card, .about-text-en, .about-text-kr, .contact-title, .contact-detail').each(function() {
        $(this).addClass('fade-in');
        observer.observe(this);
    });
    
    // Smooth reveal animation for sections
    function revealOnScroll() {
        $('.project-card').each(function() {
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
            .project-card {
                opacity: 0;
                transform: translateY(50px);
                transition: all 0.8s ease;
            }
            
            .project-card.revealed {
                opacity: 1;
                transform: translateY(0);
            }
            
            .about-text-en, .about-text-kr {
                transition-delay: 0.2s;
            }
            
            .contact-detail {
                transition-delay: calc(var(--i) * 0.1s);
            }
        `)
        .appendTo('head');
    
    // Set transition delays for contact details
    $('.contact-detail').each(function(index) {
        $(this).css('--i', index);
    });
    
    // Add easing function
    $.easing.easeInOutCubic = function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    };
    
    // Console log for debugging
    console.log('RayRayLab Style Portfolio Loaded Successfully! 🎨');
    
});
