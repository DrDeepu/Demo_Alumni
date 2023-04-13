import React from "react";
import "./Users_Hover_Effect.css";
const Users = () => {
  return (
    <div class="container">
      <div class="row">
        <div class="col-lg-4">
          <div class="card p-0">
            <div class="card-image">
              <img
                src="https://images.pexels.com/photos/2746187/pexels-photo-2746187.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <div class="card-content d-flex flex-column align-items-center">
              <h4 class="pt-2">SomeOne Famous</h4>
              <h5>Creative Desinger</h5>

              <ul class="social-icons d-flex justify-content-center">
                <li>
                  <a href="#">
                    <span class="fab fa-facebook"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="fab fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="fab fa-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card p-0">
            <div class="card-image">
              <img
                src="https://images.pexels.com/photos/381843/pexels-photo-381843.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <div class="card-content d-flex flex-column align-items-center">
              <h4 class="pt-2">SomeOne Famous</h4>
              <h5>Creative Desinger</h5>

              <ul class="social-icons d-flex justify-content-center">
                <li>
                  <a href="#">
                    <span class="fab fa-facebook"></span>
                  </a>
                </li>
                <li >
                  <a href="#">
                    <span class="fab fa-twitter"></span>
                  </a>
                </li>
                <li >
                  <a href="#">
                    <span class="fab fa-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="card p-0">
            <div class="card-image">
              <img
                src="https://images.pexels.com/photos/139829/pexels-photo-139829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                alt=""
              />
            </div>
            <div class="card-content d-flex flex-column align-items-center">
              <h4 class="pt-2">SomeOne Famous</h4>
              <h5>Creative Desinger</h5>

              <ul class="social-icons d-flex justify-content-center">
                <li >
                  <a href="#">
                    <span class="fab fa-facebook"></span>
                  </a>
                </li>
                <li >
                  <a href="#">
                    <span class="fab fa-twitter"></span>
                  </a>
                </li>
                <li >
                  <a href="#">
                    <span class="fab fa-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
