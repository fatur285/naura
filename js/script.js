document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  const jam = today.getHours();
  const isUltah = today.getDate() === 6 && today.getMonth() === 3;

  let backSound = "";
  if (isUltah) {
    backSound = "audio/hbd.mp3";
  } else {
    backSound = jam >= 6 && jam < 18 ? "audio/day.mp3" : "audio/night.mp3";
  }
  const audio = new Audio(backSound);
  audio.loop = true;
  audio.volume = 1;
  audio.preload = "auto";
  window.audio = audio;

  const videoSrc = jam >= 6 && jam < 18 ? "video/day.mp4" : "video/night.mp4";
  const video1 = document.getElementById("video1");
  const video2 = document.getElementById("video2");

  [video1, video2].forEach((video) => {
    const source = document.createElement("source");
    source.src = videoSrc;
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  });

  video1.addEventListener("play", () => {
    video2.currentTime = video1.currentTime;
    video2.play();
  });

  video1.addEventListener("timeupdate", () => {
    const selisih = Math.abs(video1.currentTime - video2.currentTime);
    if (selisih > 0.03) {
      video2.currentTime = video1.currentTime;
    }
  });

  const kontener3 = document.getElementById("kontener3");
  kontener3.classList.add(jam >= 6 && jam < 18 ? "siang" : "malam");

  const ucapanElement = document.getElementById("ucapan");
  const isiUcapanElement = document.getElementById("isiucapan");

  let ucapan = "",
    isiUcapan = "";

  if (jam >= 6 && jam < 12) {
    ucapan = "Pagi Naura!";
    isiUcapan =
      "Awali pagi kamu dengan kegiatan positif... <br> i miss u <3";
  } else if (jam >= 12 && jam <= 15) {
    ucapan = "Siang Naura!";
    isiUcapan =
      "Mam siang jangan lupa... <br> Gimana hari-hari tanpa aku nya? aku harap kamu baik-baik aja ya disana. <br> Semangat beraktivitas <3";
  } else if (jam > 15 && jam <= 18) {
    ucapan = "Sore Naura!";
    isiUcapan =
      "Mandii mandiiii... BUSSU KAMU!! <br> Bahagia terus mantan orang kesayangan aku <3";
  } else {
    ucapan = "Malem Naura!";
    isiUcapan =
      "Kurangin begadang ya... <br> Jaga kesehatan kamu! kamu boleh ga sayang aku tapi ingat, selalu sayang sama diri kamu sendiri. <br> Sehat selalu kesayangan <3";
  }

  if (ucapanElement && isiUcapanElement) {
    ucapanElement.innerHTML = ucapan;
    isiUcapanElement.innerHTML = isiUcapan;
  }

  updateWaktu();
  setInterval(updateWaktu, 1000);

  function updateWaktu() {
    const waktu = new Date();
    const menit = waktu.getMinutes().toString().padStart(2, "0");
    const jam = waktu.getHours().toString().padStart(2, "0");
    const ampm = waktu.getHours() >= 12 ? "PM" : "AM";
    const bulan = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    const hari = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ];

    const tanggal = `${hari[waktu.getDay()]}, ${waktu.getDate()} ${
      bulan[waktu.getMonth()]
    } ${waktu.getFullYear()}`;
    const jamwkwk = `${jam}:${menit} ${ampm}`;

    document.getElementById("tanggal").textContent = tanggal;
    document.getElementById("jamwkwk").textContent = jamwkwk;
  }

  const ml1Text = document.querySelector(".ml1 .letters");
  if (ml1Text) {
    ml1Text.innerHTML = ml1Text.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    anime
      .timeline({ loop: false })
      .add({
        targets: ".ml1 .letter",
        scale: [0.3, 1],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 600,
        delay: (el, i) => 70 * (i + 1),
      })
      .add({
        targets: ".ml1 .line",
        scaleX: [0, 1],
        opacity: [0.5, 1],
        easing: "easeOutExpo",
        duration: 700,
        offset: "-=875",
        delay: (el, i, l) => 80 * (l - i),
      });
  }

  const ml2Text = document.querySelector(".ml2");
  if (ml2Text) {
    ml2Text.innerHTML = ml2Text.textContent.replace(
      /\S/g,
      "<span class='letter'>$&</span>"
    );
    anime.timeline({ loop: false }).add({
      targets: ".ml2 .letter",
      scale: [4, 1],
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 950,
      delay: 1400,
    });
  }

  document.querySelectorAll(".foto-galeri, .foto-private").forEach((item) => {
    item.addEventListener("click", () => {
      const lightbox = document.getElementById("lightbox");
      const content = lightbox.querySelector(".lightbox-content");
      content.innerHTML = "";
      let isVideo = false;

      if (item.tagName.toLowerCase() === "img") {
        const img = document.createElement("img");
        img.src = item.src;
        content.appendChild(img);
      } else if (item.tagName.toLowerCase() === "video") {
        const video = document.createElement("video");
        video.src = item.querySelector("source").src;
        video.controls = true;
        video.autoplay = true;
        video.style.borderRadius = "8px";
        content.appendChild(video);
        isVideo = true;
      }

      if (isVideo && !audio.paused) audio.volume = 0.1;

      lightbox.setAttribute("data-jenis", isVideo ? "video" : "gambar");
      lightbox.style.display = "flex";
    });
  });

  document.getElementById("lightbox").addEventListener("click", function (e) {
    if (e.target === this) {
      this.style.display = "none";
      this.querySelector(".lightbox-content").innerHTML = "";
      if (this.getAttribute("data-jenis") === "video" && !audio.paused) {
        audio.volume = 1;
      }
      this.removeAttribute("data-jenis");
    }
  });

  window.tampilkanFormBalasan = () => {
    document.getElementById("formBalasanModal").style.display = "flex";
  };

  window.tutupFormBalasan = () => {
    document.getElementById("formBalasanModal").style.display = "none";
  };

  window.PindahKeHalaman = (index) => {
    const semuaHalaman = document.querySelectorAll(
      "#kontener .dalemnya_halaman"
    );
    semuaHalaman.forEach((halaman, i) => {
      halaman.style.display = i === index ? "block" : "none";
    });

    document.getElementById("kontener3").style.display = "none";
    document.getElementById("kontener").style.display = "block";
  };

  window.kembaliKeMenu = () => {
    document.getElementById("kontener").style.display = "none";
    document.getElementById("kontener3").style.display = "flex";
    document
      .querySelectorAll("#kontener .dalemnya_halaman")
      .forEach((h) => (h.style.display = "none"));
  };

  window.toggleDropdown = () => {
    const menu = document.getElementById("dropdownMenu");
    menu.style.display =
      menu.style.display === "none" || menu.style.display === ""
        ? "flex"
        : "none";
  };
});

$(document).ready(() => {
  // p
   const popupSound = new Audio("audio/popup.mp3");
   popupSound.volume = 0.5;
  // p

  $("#tombol").click(() => {
    $("#kontener2").fadeOut();
    $("#kontener3").fadeIn(3000);

    audio.loop = true;
    audio.volume = 1;
    audio.play();

    setTimeout(() => {
      // p
       audio.volume = 0.2;
       popupSound.play();

       popupSound.onended = () => {
         audio.volume = 1;
       };
      // p

      Swal.fire({
        title: "🌷",
        text: "Sayangg aku kangennn 😓",
        confirmButtonText: "Close",
        allowOutsideClick: false,
        customClass: {
          popup: "my-swal-popup",
          title: "my-swal-title",
          confirmButton: "my-swal-confirm",
        },
      });
    }, 4000);
  });
});
