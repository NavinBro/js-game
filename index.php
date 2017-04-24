<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="game.css">

</head>
<body onkeydown="onKey(event)">

  <div class="wrap">

    <div id="user">
      <div id="us_money">Coins: <span>0</span></div>
      <div id="us_life">Life: <span>3</span></div>
    </div>

    <div class="notification">
      Notifications
    </div>

    <div class="rules">
      Try to collect 500 coins. Be careful, there are 15 hidden bombs on the field. If you step on one, you will lose one life. You can restore the life if you find a shield.
      Good luck!
    </div>

  </div>

    <div id="stage">
    </div>


<script src="game.js"></script>
</body>
</html>
