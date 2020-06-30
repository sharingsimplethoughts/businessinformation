import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  

    $('.sidenav-collapse .sidenav li a').click(function(){
      if($('body').hasClass('layout-sidebar-collapsed')){
        $('.sidenav-collapse .sidenav').addClass('sidenav-collapsed');
      }else{
        $('.sidenav-collapse .sidenav').removeClass('sidenav-collapsed');
      }
    });

    function close_menu() {
      $('.has-subnav').removeClass('open');
      $('.has-subnav ul').slideUp(500).addClass('collapse');
    }
    
    $('.has-subnav > a').click(function(e){
    
      if($(e.target).closest('.has-subnav').is('.open')) {
        close_menu();
      }else {
        close_menu();
        $(this).closest('.has-subnav').addClass('open');
        $(this).next().slideDown(500).removeClass('collapse');
      }
      e.preventDefault();
    });

  // $('.sidenav-toggler').on('click', function(){
  //   $('body').toggleClass('layout-sidebar-collapsed');
  //   $('.sidenav-collapse').toggleClass('sidenav-collapsed');
  // $('.sidenav-collapse').toggleClass('collapse');
  //  });

  //  $('.has-subnav > a').click(function(){
  //   if($('body').hasClass('layout-sidebar-collapsed')){
  //     $(this).closest('.has-subnav').toggleClass('active');
  //     $(this).next('ul').slideToggle('');
  //   }else{
  //     $(this).click('disabled', true);
  //   }
  // });
  }

}
