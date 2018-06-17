import {Injectable} from '@angular/core';

@Injectable()
export class WindowHeightInitService {
  onInit() {
    //初始化系统height
    let windowHeight = $(window).height();
    let contentWrapperHeight = windowHeight - parseFloat($('.main-header').css('height').slice(0, -2)) - parseFloat($('.main-footer').css('height').slice(0, -2));
    $('body').css('min-height', windowHeight + 'px');
    $('.content-wrapper').css('min-height', contentWrapperHeight + 'px');
  }
}
