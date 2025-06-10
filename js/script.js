const audio = new Audio('audio/audio.mp3');

document.addEventListener("DOMContentLoaded", () => {
  const semuaHalaman = document.querySelectorAll('#kontener .dalemnya_halaman');
  semuaHalaman.forEach((halaman, index) => {
    halaman.style.display = (index === 0) ? 'block' : 'none';
  });

  const ucapanElement = document.getElementById("ucapan");
  const isiUcapanElement = document.getElementById("isiucapan");

  const waktuSekarang = new Date();
  const jam = waktuSekarang.getHours();

  let ucapan = "";
  let isiUcapan = "";

  if (jam >= 0 && jam < 12) {
    ucapan = "Pagi Naura!";
    isiUcapan = "Awali pagi kamu dengan hal - hal yg positif ya... jangan terlalu mikirin cinta, karena pada dasarnya cinta datang pada wanita yg hebat. <br/> be happy <3";
  } else if (jam >= 12 && jam <= 15) {
    ucapan = "Siang Naura!";
    isiUcapan = "Makan siangnya jangan lupa! katanya pengen gemuk. <br/> Semangat beraktivitas <3";
  } else if (jam > 15 && jam <= 18) {
    ucapan = "Sore Naura!";
    isiUcapan = "Jangan males mandi sore! <br/> Bahagia terus kamu <3";
  } else {
    ucapan = "Malem Naura!";
    isiUcapan = "Kurangin begadangnya, kita gatau penyakit bisa datang kapan aja & disaat apa aja <br/> Sehat selalu <3";
  }

  ucapanElement.innerHTML = ucapan;
  isiUcapanElement.innerHTML = isiUcapan;

  updateWaktu();
  setInterval(updateWaktu, 1000);
});

$(document).ready(function () {
  const popupSound = new Audio('audio/popup.mp3');

  $("#tombol").click(function () {
    $("#kontener2").fadeOut();
    $("#kontener3").fadeIn("4000");

    audio.volume = 1;
    audio.play();

    setTimeout(function () {
      audio.volume = 0.2;
      popupSound.play();

      popupSound.onended = function () {
        audio.volume = 1;
      };

      Swal.fire({
        title: 'Halo!',
        text: 'Bahagia terus ya... selalu ada org lain yg nunggu kabar bahagia dari kamu! ~',
        confirmButtonText: 'Close',
        allowOutsideClick: false
      });
    }, 4000);
  });
});

function toggleDropdown() {
  const menu = document.getElementById("dropdownMenu");
  menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
}

function PindahKeHalaman(index) {
  const container = document.getElementById("kontener");
  const pages = container.querySelectorAll(".dalemnya_halaman");

  pages.forEach((page, i) => {
    page.style.display = (i === index) ? "block" : "none";
  });

  container.style.display = "block";
  document.getElementById("kontener3").style.display = "none";

  document.getElementById("dropdownMenu").style.display = "none";
}

function kembaliKeMenu() {
  const pages = document.querySelectorAll(".dalemnya_halaman");
  pages.forEach(page => page.style.display = "none");

  document.getElementById("kontener").style.display = "none";
  document.getElementById("kontener3").style.display = "block";

  updateUcapanDanWaktu();
}


document.getElementById("waktu").innerHTML = formatAMPM();

    function formatAMPM() {
      var waktu = new Date(),
        menit = waktu.getMinutes().toString().length == 1 ? '0' + waktu.getMinutes() : waktu.getMinutes(),
        jam = waktu.getHours().toString().length == 1 ? '0' + waktu.getHours() : waktu.getHours(),
        ampm = waktu.getHours() >= 12 ? 'PM' : 'AM',
        bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober',
          'November', 'Desember'
        ],
        hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      return '<h1 class="ml1"><span class="text-wrapper"><span class="line line1"></span><span class="letters">' + hari[
          waktu.getDay()] +
        ', ' + waktu.getDate() + ' ' + bulan[waktu.getMonth()] +
        ' ' + waktu.getFullYear() + '</span><span class="line line2"></span></span></h1><p class="ml2"> ' + jam + ':' +
        menit + ' ' + ampm + ' </p>';

    }

var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
    loop: false
  })
  .add({
    targets: '.ml1 .letter',
    scale: [0.3, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 600,
    delay: (el, i) => 70 * (i + 1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0, 1],
    opacity: [0.5, 1],
    easing: "easeOutExpo",
    duration: 700,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({
    loop: false
  })
  .add({
    targets: '.ml2 .letter',
    scale: [4, 1],
    opacity: [0, 1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: 1400
  }).add({
    targets: '.ml2',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });

  function PindahKeHalaman(index) {
    const semuaHalaman = document.querySelectorAll('#kontener .dalemnya_halaman');
    if (!semuaHalaman || semuaHalaman.length === 0) {
      console.error("Halaman tidak ditemukan");
      return;
    }
  
    semuaHalaman.forEach((halaman, i) => {
      halaman.style.display = (i === index) ? 'block' : 'none';
    });
  
    document.getElementById("kontener3").style.display = "none";
    document.getElementById("kontener").style.display = "block";
  }
  
  function kembaliKeMenu() {
    document.getElementById("kontener").style.display = "none";
    document.getElementById("kontener3").style.display = "flex";
  
    const semuaHalaman = document.querySelectorAll('#kontener .dalemnya_halaman');
    semuaHalaman.forEach(halaman => {
      halaman.style.display = 'none';
    });
  }

  const lightbox = document.getElementById('lightbox');
  const content = lightbox.querySelector('.lightbox-content');

  document.querySelectorAll('.foto-galeri').forEach(item => {
    item.addEventListener('click', () => {

      content.innerHTML = '';

      let isVideo = false;

      if (item.tagName.toLowerCase() === 'img') {
        const img = document.createElement('img');
        img.src = item.src;
        content.appendChild(img);
      } else if (item.tagName.toLowerCase() === 'video') {
        const video = document.createElement('video');
        video.src = item.querySelector('source').src;
        video.controls = true;
        video.autoplay = true;
        video.style.borderRadius = '8px';
        content.appendChild(video);
        isVideo = true;
     }

     if (isVideo && !audio.paused) {
      audio.volume = 0.1;
    }

    lightbox.setAttribute('data-jenis', isVideo ? 'video' : 'gambar');
    lightbox.style.display = 'flex';
  });
});

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      content.innerHTML = '';

    const jenis = lightbox.getAttribute('data-jenis');
    if (jenis === 'video' && !audio.paused) {
      audio.volume = 1;
    }

    lightbox.removeAttribute('data-jenis');
  }
 });

 function tampilkanFormBalasan() {
  document.getElementById('formBalasanModal').style.display = 'flex';
}
function tutupFormBalasan() {
  document.getElementById('formBalasanModal').style.display = 'none';
}
