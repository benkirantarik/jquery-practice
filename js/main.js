/* global console,$,document  */


$(function(){
    
    'use strict';
    
    $(window).scroll(function(){
        
    // Sync Navbar Links With Sections
        
        $('.block').each(function(){
            if($(window).scrollTop() > $(this).offset().top){
               var blockID = $(this).attr('id');
                $('.navbar li a[data-scroll="'+blockID+'"]').addClass('active').parent().siblings().find('a').removeClass('active');
            }
        })
        
    // Scroll To Top Button
        
        var scrollToTop = $('.scroll-to-top');
        
        if($(window).scrollTop() >= 1000){
            
            if(scrollToTop.is(':hidden')){
                
                scrollToTop.fadeIn(400);
                
            } 
            
        }else{
            scrollToTop.fadeOut(400);
        }
    })
    
    $('.scroll-to-top').click(function(){
        $('html,body').animate({scrollTop : 0},2000)
    })
    
    // Calculate Body Padding Top Depend On Navbar Height 
    
    $('body').css('padding-top',$('.navbar').innerHeight() + 11);

    // Smoothly Scroll To Element
    
    $('.navbar li a').click(function(e){
        
        e.preventDefault();
        $('.navbar li a').addClass('active').parent().siblings().find('a').removeClass('active')
        $('html,body').animate({
            scrollTop: $('#'+$(this).data('scroll')).offset().top+1
        },1000)
   })
    
    // Popup
    
    $('.show-popup').click(function(){
        $($(this).data('popup')).fadeIn();
    })
    $('.popup').click(function(){
        $(this).fadeOut();
    })    
    $('.popup .close').click(function(e){
        e.preventDefault();
        $(this).parentsUntil('.popup').parent().fadeOut()
    })
    $('.popup .inner').click(function(e){
        e.stopPropagation();
    })
    
    // Echap Key Press
    
    $(document).keydown(function(e){
        if( e.keyCode == 27 ){
            $('.popup').fadeOut();
        }
    })
    
    // Add span
    
    $('.buttons-effects button').each(function(){
        $(this).prepend('<span></span>')
    })
    
    // Buttons With Effects
    
    $('.from-left, .border-left').hover(function(){
        $(this).find('span').eq(0).animate({'width':'100%'},300)
    },function(){
        $(this).find('span').eq(0).animate({'width':'0%'},300) 
    })
    
    $('.from-top, .border-top').hover(function(){
        $(this).find('span').eq(0).animate({'height':'100%'},300)
    },function(){
        $(this).find('span').eq(0).animate({'height':'0%'},300) 
    })
    
    // Animated Progress
    
    $('.animated-progress span').each(function(){
        $(this).animate({
            'width':$(this).attr('data-progress')+'%'
        },2000,function(){
            $(this).text($(this).attr('data-progress')+'%')
        })
    })
    
    $('.fixed-menu .fa-gear').click(function(){
        var fixedMenu = $(this).parent('.fixed-menu');
        fixedMenu.toggleClass('is-visible');
        if(fixedMenu.hasClass('is-visible')){
            fixedMenu.animate({left:0},500)
            $('body').animate({paddingLeft:fixedMenu.innerWidth()},500)
        }else{
            fixedMenu.animate({left:'-'+fixedMenu.innerWidth()+'px'})
            $('body').animate({paddingLeft:0},500)
        }
    })
    
    // Change Colors 
    
    $('.change-colors li').on('click',function(){
        $('body').attr('data-default-color',$(this).data('color'))
    })
    
    $(document).keydown(function(e){
       if(e.keyCode == 39){
           $('.fixed-menu').animate({'left':0},500)
       }else if(e.keyCode == 37){
           $('.fixed-menu').animate({'left':-220},500)     
                };
    })
    
    // Thumbnails Gallery
    
    var thumbNumberOfChilds = $('.thumbnails').children().length;
    var totalMargin = (thumbNumberOfChilds - 1 ) * 0.5;
    var thumbImgWidth = (100 - totalMargin)/thumbNumberOfChilds;
    $('.thumbnails img').css('width',thumbImgWidth+'%')
    
    $('.thumbnails img').on('click',function(){
        
        $(this).addClass('selected').siblings().removeClass('selected');
        $('.master-image img').hide().attr('src',$(this).attr('src')).fadeIn(500)
    })
    
    $('.fa-chevron-right').click(function(){
        if($('.thumbnails .selected').is(':last-child')){
         $('.thumbnails img').eq(0).click();   
        }else{
         $('.thumbnails .selected').next().click()  
        }
    })
    $('.fa-chevron-left').click(function(){
        if($('.thumbnails .selected').is(':first-child')){
         $('.thumbnails img:last').click();   
        }else{
         $('.thumbnails .selected').prev().click()
        }
    })
    
    // Toggle Product Description
    
    $('.product i, .item i').click(function(){
        $(this).toggleClass('fa-minus fa-plus').siblings('.description').slideToggle(400)
    })
    
    // Switch List And Grid View
    
    $('.view-options i').click(function(){
        $('.items').removeClass('list-view grid-view').addClass($(this).data('view'))
        $(this).addClass('active').siblings().removeClass('active')
    })
    
    // Error Message Effects
    
    $('.error-message').each(function(){
        $(this).animate({
        right : 0
    },900,function(){
        $(this).delay(3000).fadeOut()   
        })
    })
    
    /* 
    ** Our Form 
    ** Practical Exemples
    */
    
    // Hide Placeholder On Focus & Restore it On Blur
    
    var placeAttr = '';
    
    $('[placeholder]').focus(function(){
        placeAttr = $(this).attr('placeholder');
        $(this).attr('placeholder','');
    }).blur(function(){
       $(this).attr('placeholder',placeAttr); 
    })
    
    // Show Message When Field Is Empthy
    
    $('[required]').blur(function(){
        if($(this).val() == ''){
            $(this).next('span').fadeIn().delay(2000).fadeOut()
        }
    })
    
    // Add Asterisk To All Required Fields
    
    $('<span class="asterisk">*</span>').insertBefore(':input[required]');
    
    // Custumize The Asterisk With Jquery
    
    $('.asterisk').parent('div').css('position','relative');
    $('.asterisk').each(function(){
        $(this).css({
        position : 'absolute',
        top : 13,
        left : $(this).parent().find(':input').innerWidth()-20,
        color : '#F00',
        fontWeight : 'bold'
    })
    });
    
    // Customize The Input Field
    $('.our-form input[type="file"]').wrap('<div class="custom-file"></div>');
    $('.custom-file').prepend('<span>Upload Your Files</span>');
    $('.custom-file').append('<i class="fa fa-upload fa-lg skin-color"></i>');
    $('.our-form input[type="file"]').change(function(){
        $(this).prev('span').text($(this).val())
    });
    
//    $(document).keydown(function(e){
//        if(e.keyCode == 13){
//            $('.our-form input[type="submit"]').click()
//        }
//    })

    // Detect Unicode Of Keyboard Key
    
    $('.detect-unicode').on('keyup',function(event){
        var keyboardKey = event.keyCode || event.which;
        $('.unicode').html(keyboardKey)
    })
    
    // Change Input Direction Depend On The Language
    
    $('.auto-direction').on('keyup',function(e){
        if($(this).val().charCodeAt(0)<200){
            $(this).css('direction','ltr');
            $(this).attr('placeholder','Enter Your Email');
        }else{
            $(this).css('direction','rtl');
            $(this).attr('placeholder','أدخل عنوان بريدك');
        }
        
    })
    
    // Convert Input Value To Tags
    var tags = [];
    $('.add-tag').on('keyup',function(e){
        var keyboardKey = e.keyCode || e.which;
        if(keyboardKey == 188){
            var thisValue = $(this).val().slice(0,-1);
            if(tags.indexOf(thisValue.trim().toLocaleLowerCase()) == -1){
                $('.tags').append('<span class="tag-span"><i class="fa fa-times"></i>'+thisValue+'</span>');
                tags.push(thisValue.trim().toLocaleLowerCase());
                console.log(tags);
                $(this).val('');   
            }else{
                alert('This Tag Already Exist !')
            }

        }                 
    })
    
    // Remove Tag On Click 
    
    $('.tags').on('click','.tag-span i',function(){
        $(this).parent('.tag-span').fadeOut(500)
    })
    
    // Trimmed Paragraph Length
    
    function TrimText(selector,maxLength){
    $(selector).each(function(){
        if($(this).text().length>maxLength){
            $(this).text($(this).text().substr(0,maxLength)+' ...')
        }
    })
    }
    
    TrimText('.trimmed-texts .p-one',100);
    TrimText('.trimmed-texts .p-two',200);
    TrimText('.trimmed-texts .p-three',300);
    
    // Start Bounce Button
    
    function BounceButton(selector,times,distance,speed){
        for( var i = 0 ; i < times ; i = i + 1){
        $(selector).animate({
            top : '-='+distance
        },speed).animate({
            top : '+='+distance
        },speed)
        }
    }
    
    $('.bounce-one').click(function(){
        BounceButton($(this),3,20,200)
    })
    $('.bounce-two').click(function(){
        BounceButton($(this),5,25,220)
    })
    $('.bounce-three').click(function(){
        BounceButton($(this),10,15,100)
    })
    
    // End Bounce Button

    // Adjust Element Height To Be The Same
    var MaxHeight = 0;
    
    $('.same-height div').each(function(){
        if($(this).height() > MaxHeight){
            MaxHeight = $(this).height();
        }
    })
    
    $('.same-height div').height(MaxHeight);
    
    // Shuffle Cards
    
    var zIndexCard = 0;
    $('.cards .card').click(function(){
        $(this).animate({
            left : '25%',
            marginTop : 15,
            opacity : .5,
            height : '120px',
            width : '120px'
        },400).animate({
            height : '80px',
            width : '80px'
        },400,function(){
            zIndexCard--;
            $(this).css('z-index',zIndexCard)
        }).animate({
            left : '85%'
        },400).animate({
            height : '120px',
            width : '120px'
        },400).animate({
            left : '50%',
            marginTop : 0,
            opacity : 1,
            height : '150px',
            width : '150px'
        },400)
    })
    
    // Create Blink Warning
    
    WarningLoop();
    
    function WarningLoop(){
        $('.blink-warning').fadeOut(1000 , function(){$(this).fadeIn(1000);WarningLoop()});
    }
    
    // Create To Do List
    
    var newTask = $('.task-input');
    
    $('.add-task').on('submit',function(e){
        e.preventDefault();
        if(newTask.val() != ''){
            $('<li>'+newTask.val()+'</li>').appendTo('.tasks');
            newTask.val('');
        }
    })
    
    $('.tasks').on('click','li',function(){
        $(this).css('text-decoration','line-through').delay(200).fadeOut(400,function(){
            $(this).remove()
        })
    })
    
    // Start TypeWritter Machine
    
    var typerText = $('.typer').data('text'),
        typerTextLen = typerText.length,
        n = 0,
        theTyper = setInterval(function(){
            $('.typer').each(function(){
                $(this).html($(this).html()+typerText[n])
            })
            n += 1;
        if(n === typerTextLen){
            clearInterval(theTyper);
        }
        },50);
    
    // Calculate Summary Total Price Value
    var total = 0;
    $('.price').each(function(){
        total += parseInt($(this).text());
    })
        $('.the-total').html(total);
    
    // Auto Change Content
    
    (function autoChange(){
        $('.ticker-list .active').each(function(){
            if(! $(this).is(':last-child')){
                $(this).delay(1000).fadeOut(1000,function(){
                    $(this).removeClass('active').next().addClass('active').fadeIn();
                    autoChange();
                })
            }else{
                $(this).delay(1000).fadeOut(1000,function(){
                    $(this).removeClass('active');
                    $('.ticker-list li:first').addClass('active').fadeIn();
                    autoChange();
                })
            }
        })
    }());
    
    
});
