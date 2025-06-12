const today = new Date();
const isUltah = today.getDate() === 6 && today.getMonth() === 3;

const audio = new Audio(isUltah ? 'audio/hbd.mp3' : 'audio/audio.mp3');

audio.preload = 'auto';

document.addEventListener("DOMContentLoaded", () => {

  const semuaHalaman = document.querySelectorAll('#kontener .dalemnya_halaman');
  semuaHalaman.forEach((halaman, index) => {
    halaman.style.display = (index === 0) ? 'block' : 'none';
  });

  const ucapanElement = document.getElementById("ucapan");
  const isiUcapanElement = document.getElementById("isiucapan");
  const waktuSekarang = new Date();
  const jam = waktuSekarang.getHours();

  let ucapan = "", isiUcapan = "";

  if (jam >= 6 && jam < 12) {
    ucapan = "Pagi Naura!";
    isiUcapan = "Awali pagi kamu dengan hal - hal yg positif... jangan terlalu mikirin cinta, karena cinta yg tepat datang pada orang yg tepat. <br/> be happy <3";
  } else if (jam >= 12 && jam <= 15) {
    ucapan = "Siang Naura!";
    isiUcapan = "Makan siangnya jangan lupa! katanya pengen gemuk. <br/> Semangat beraktivitas <3";
  } else if (jam > 15 && jam <= 18) {
    ucapan = "Sore Naura!";
    isiUcapan = "Jangan lupa mandi! <br/> Bahagia terus kamu <3";
  } else {
    ucapan = "Malem Naura!";
    isiUcapan = "Jangan sering begadang ya, kita gatau penyakit bisa datang kapan aja & disaat apa aja <br/> Sehat selalu <3";
  }

  if (ucapanElement && isiUcapanElement) {
    ucapanElement.innerHTML = ucapan;
    isiUcapanElement.innerHTML = isiUcapan;
  }

  updateWaktu();
  setInterval(updateWaktu, 1000);

  function updateWaktu() {
    const waktu = new Date();
    const menit = waktu.getMinutes().toString().padStart(2, '0');
    const jam = waktu.getHours().toString().padStart(2, '0');
    const ampm = waktu.getHours() >= 12 ? 'PM' : 'AM';
    const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
    const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  
    const tanggal = `${hari[waktu.getDay()]}, ${waktu.getDate()} ${bulan[waktu.getMonth()]} ${waktu.getFullYear()}`;
    const jamwkwk = `${jam}:${menit} ${ampm}`;
  
    document.getElementById("tanggal").textContent = tanggal;
    document.getElementById("jamwkwk").textContent = jamwkwk;
  }  

  const ml1Text = document.querySelector('.ml1 .letters');
if (ml1Text) {
  ml1Text.innerHTML = ml1Text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({ loop: false })
    .add({
      targets: '.ml1 .letter',
      scale: [0.3, 1],
      opacity: [0, 1],
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
    });
}

const ml2Text = document.querySelector('.ml2');
if (ml2Text) {
  ml2Text.innerHTML = ml2Text.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
  anime.timeline({ loop: false })
    .add({
      targets: '.ml2 .letter',
      scale: [4, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 950,
      delay: 1400
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

      if (isVideo && !audio.paused) audio.volume = 0.1;

      lightbox.setAttribute('data-jenis', isVideo ? 'video' : 'gambar');
      lightbox.style.display = 'flex';
    });
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
      content.innerHTML = '';
      if (lightbox.getAttribute('data-jenis') === 'video' && !audio.paused) {
        audio.volume = 1;
      }
      lightbox.removeAttribute('data-jenis');
    }
  });

  window.tampilkanFormBalasan = () => {
    document.getElementById('formBalasanModal').style.display = 'flex';
  };

  window.tutupFormBalasan = () => {
    document.getElementById('formBalasanModal').style.display = 'none';
  };

  window.PindahKeHalaman = (index) => {
    const semuaHalaman = document.querySelectorAll('#kontener .dalemnya_halaman');
    semuaHalaman.forEach((halaman, i) => {
      halaman.style.display = (i === index) ? 'block' : 'none';
    });

    document.getElementById("kontener3").style.display = "none";
    document.getElementById("kontener").style.display = "block";
  };

  window.kembaliKeMenu = () => {
    document.getElementById("kontener").style.display = "none";
    document.getElementById("kontener3").style.display = "flex";

    document.querySelectorAll('#kontener .dalemnya_halaman')
      .forEach(halaman => halaman.style.display = 'none');
  };

  window.toggleDropdown = () => {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display = (menu.style.display === "none" || menu.style.display === "") ? "flex" : "none";
  };
});

$(document).ready(() => {
  const popupSound = new Audio('audio/popup.mp3');

  $("#tombol").click(() => {
    $("#kontener2").fadeOut();
    $("#kontener3").fadeIn("4000");

    audio.loop = true;
    audio.volume = 1;
    audio.play();

    setTimeout(() => {
      audio.volume = 0.2;
      popupSound.play();

      popupSound.onended = () => {
        audio.volume = 1;
      };

      Swal.fire({
        title: '🎈',
        text: 'Web ini bakal terus aktif sampai aku udah bener - bener mati rasa sama kamu atau mungkin aku udah gaada. Fatur ~',
        confirmButtonText: 'Close',
        allowOutsideClick: false
      });
    }, 4000);
  });
});
