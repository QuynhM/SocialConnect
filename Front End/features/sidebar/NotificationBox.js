import React from 'react';
import '../../Style.css';

function NotificationBox({ isVisible }) {
  return (
    <div className={`notification-box ${isVisible ? 'visible' : ''}`}>
    <div>
        <div class="profile-picture">
            <img src="https://static.vecteezy.com/system/resources/previews/006/241/030/large_2x/cute-cartoon-puppy-funny-dog-illustration-for-kids-illustration-with-black-outline-happy-cartoon-puppy-sits-portrait-of-a-cute-dog-a-dog-friend-with-love-free-vector.jpg" alt="" />                                        
        </div>
        <div class="notification-body">
            <b>Maria Lily</b> accepted your firend request
            <small class="text-gry">1 DAYS AGO</small>
        </div>
    </div>
    <div>
        <div class="profile-picture">
            <img src="https://static.vecteezy.com/system/resources/previews/008/668/423/large_2x/cute-strong-donkey-cartoon-character-premium-free-vector.jpg" alt="" />                                        
        </div>
        <div class="notification-body">
            <b>Jhon Evan</b> commented on your post
            <small class="text-gry">2 HOUR AGO</small>
        </div>
    </div>
    <div>
        <div class="profile-picture">
            <img src="https://static.vecteezy.com/system/resources/previews/008/255/567/large_2x/cute-hamster-mascot-illustration-cartoon-premium-free-vector.jpgg" alt="" />                                        
        </div>
        <div class="notification-body">
            <b>Emaliy Benjamin</b> liked on your post
            <small class="text-gry">JUST NOW</small>
        </div>
    </div>
    <div>
        <div class="profile-picture">
            <img src="https://static.vecteezy.com/system/resources/previews/008/255/588/large_2x/cute-unicorn-dabbing-cartoon-icon-illustration-free-vector.jpg" alt="" />                                        
        </div>
        <div class="notification-body">
            <b>Mark Trump</b> and <b>10 other</b> liked on your post
            <small class="text-gry">2 HOUR AGO</small>
        </div>
    </div>
    <div>
        <div class="profile-picture">
            <img src="https://static.vecteezy.com/system/resources/previews/008/255/597/large_2x/cute-dog-mascot-illustration-cartoon-premium-free-vector.jpg" alt="" />                                        
        </div>
        <div class="notification-body">
            <b>Evrahim Alli</b> and <b>5 other</b> commented on your post
            <small class="text-gry">3 DAYS AGO</small>
        </div>
    </div>
</div>
  );
}

export default NotificationBox;