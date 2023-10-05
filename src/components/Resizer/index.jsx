import React, { useEffect, useState } from "react";
import * as Icon from "react-bootstrap-icons";
import "./styles.scss";

const Resizer = (props) => {

    function makeResizableDiv(event) {
        console.log('resize...', event.target);
        const resizerEl = document.getElementById(`resizer`);
        const resizers = document.querySelectorAll('.resizer');
        const minimum_size = 20;
        let original_width = 0;
        let original_height = 0;
        let original_x = 0;
        let original_y = 0;
        let original_mouse_x = 0;
        let original_mouse_y = 0;
        for (let i = 0;i < resizers.length; i++) {
          const currentResizer = resizers[i];
          currentResizer.addEventListener('mousedown', function(e) {
            e.preventDefault()
            original_width = parseFloat(getComputedStyle(resizerEl, null).getPropertyValue('width').replace('px', ''));
            original_height = parseFloat(getComputedStyle(resizerEl, null).getPropertyValue('height').replace('px', ''));
            original_x = resizerEl.getBoundingClientRect().left;
            original_y = resizerEl.getBoundingClientRect().top;
            original_mouse_x = e.pageX;
            original_mouse_y = e.pageY;
            window.addEventListener('mousemove', resizeStart)
            window.addEventListener('mouseup', resizeStop)
          })
          
          function resizeStart(e) {
            if (currentResizer.classList.contains('bottom-right')) {
              const width = original_width + (e.pageX - original_mouse_x);
              const height = original_height + (e.pageY - original_mouse_y)
              if (width > minimum_size) {
                resizerEl.style.width = width + 'px'
              }
              if (height > minimum_size) {
                resizerEl.style.height = height + 'px'
              }
            }
            else if (currentResizer.classList.contains('bottom-left')) {
              const height = original_height + (e.pageY - original_mouse_y)
              const width = original_width - (e.pageX - original_mouse_x)
              if (height > minimum_size) {
                resizerEl.style.height = height + 'px'
              }
              if (width > minimum_size) {
                resizerEl.style.width = width + 'px'
                resizerEl.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
              }
            }
            else if (currentResizer.classList.contains('top-right')) {
              const width = original_width + (e.pageX - original_mouse_x)
              const height = original_height - (e.pageY - original_mouse_y)
              if (width > minimum_size) {
                resizerEl.style.width = width + 'px'
              }
              if (height > minimum_size) {
                resizerEl.style.height = height + 'px'
                resizerEl.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
              }
            }
            else {
              const width = original_width - (e.pageX - original_mouse_x)
              const height = original_height - (e.pageY - original_mouse_y)
              if (width > minimum_size) {
                resizerEl.style.width = width + 'px'
                resizerEl.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
              }
              if (height > minimum_size) {
                resizerEl.style.height = height + 'px'
                resizerEl.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
              }
            }
          }
          
          function resizeStop() {
            console.log('resizing stop...')
            window.removeEventListener('mousemove', resizeStart)
          }
        }
      }
      

  return (
    <div id="resizer" className="resizable" onClick={(event) => makeResizableDiv(event)}>
      <div className="resizers">
        <div className="resizer top-left"></div>
        <div className="resizer top-right"></div>
        <div className="resizer bottom-left"></div>
        <div className="resizer bottom-right"></div>
      </div>
      <div className="rotators">
        <div className="rotator top-left"><Icon.ArrowRepeat/></div>
        <div className="rotator top-right"><Icon.ArrowRepeat/></div>
        <div className="rotator bottom-left"><Icon.ArrowRepeat/></div>
        <div className="rotator bottom-right"><Icon.ArrowRepeat/></div>
      </div>
    </div>
  );
};

export default Resizer;
