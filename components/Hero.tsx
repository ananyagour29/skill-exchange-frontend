"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaGraduationCap,
  FaUsers,
  FaRocket,
} from "react-icons/fa";

export default function Hero() {
  return (
    <>
      <section className="hero">

        <div className="container">

          <span className="badge">
            Welcome to SkillExchange
          </span>

          <h1>
            Exchange Skills,
            <br />
            <span>Learn Together.</span>
          </h1>

          <p className="subtitle">
            A platform where people teach what they know and
            learn what they don't. Connect with learners,
            mentors and professionals to exchange knowledge.
          </p>

          <div className="buttons">

            <Link href="/login">
              <button className="loginBtn">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="registerBtn">
                Register
              </button>
            </Link>

          </div>

          <div className="heroImage">

            <Image
              src="/images/hero.png"
              alt="Hero"
              width={650}
              height={500}
              priority
            />

          </div>

        </div>

      </section>

      {/* ================= ABOUT ================= */}

      <section className="about">

        <div className="aboutContainer">

          <span className="aboutBadge">
            ABOUT
          </span>

          <h2>
            Why SkillExchange?
          </h2>

          <p className="aboutText">
            SkillExchange connects people who want to learn
            with those who want to teach. Share your knowledge,
            discover new skills and grow together through
            collaborative learning.
          </p>

          <div className="cardContainer">

            <div className="card">

              <div className="icon">

                <FaGraduationCap />

              </div>

              <h3>Learn</h3>

              <p>
                Learn new skills from experienced mentors.
              </p>

            </div>

            <div className="card">

              <div className="icon">

                <FaUsers />

              </div>

              <h3>Connect</h3>

              <p>
                Meet learners and mentors with similar interests.
              </p>

            </div>

            <div className="card">

              <div className="icon">

                <FaRocket />

              </div>

              <h3>Grow</h3>

              <p>
                Share your expertise and build your reputation.
              </p>

            </div>

          </div>

        </div>

      </section>

      <style jsx>{`

        .hero{
          background:#F8F4EF;
          min-height:100vh;
          display:flex;
          align-items:center;
          justify-content:center;
          padding:100px 20px;
        }

        .container{
          width:100%;
          max-width:1200px;
          text-align:center;
        }

        .badge{
          display:inline-block;
          background:white;
          color:#A67C52;
          border:1px solid #E5DDD4;
          padding:12px 24px;
          border-radius:40px;
          font-weight:600;
        }

        h1{
          margin-top:35px;
          font-size:64px;
          line-height:1.2;
          color:#2D2D2D;
        }

        h1 span{
          color:#A67C52;
        }

        .subtitle{
          margin:35px auto;
          max-width:700px;
          color:#666;
          line-height:1.9;
          font-size:18px;
        }

        .buttons{
          display:flex;
          justify-content:center;
          gap:30px;
          margin-top:50px;
          flex-wrap:wrap;
        }

        .loginBtn,
        .registerBtn{
          width:220px;
          height:58px;
          border-radius:14px;
          font-size:18px;
          font-weight:600;
          cursor:pointer;
          transition:.3s;
        }

        .loginBtn{
          background:#A67C52;
          color:white;
          border:none;
        }

        .loginBtn:hover{
          background:#8C6542;
        }

        .registerBtn{
          background:white;
          color:#A67C52;
          border:2px solid #A67C52;
        }

        .registerBtn:hover{
          background:#A67C52;
          color:white;
        }

        .heroImage{
          margin-top:70px;
          display:flex;
          justify-content:center;
        }

        .heroImage img{
          width:100%;
          max-width:650px;
          height:auto;
        }

        /* ===== Part 2 continues from here ===== */

              .about{
          background:#ffffff;
          padding:100px 20px;
        }

        .aboutContainer{
          max-width:1200px;
          margin:0 auto;
          text-align:center;
        }

        .aboutBadge{
          display:inline-block;
          background:#F8F4EF;
          color:#A67C52;
          padding:12px 24px;
          border-radius:40px;
          font-weight:600;
          letter-spacing:1px;
        }

        .about h2{
          margin-top:28px;
          font-size:48px;
          color:#2D2D2D;
        }

        .aboutText{
          max-width:720px;
          margin:30px auto 0;
          font-size:18px;
          line-height:1.9;
          color:#666;
        }

        .cardContainer{
          margin-top:70px;
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:30px;
        }

        .card{
          background:#F8F4EF;
          border:1px solid #E5DDD4;
          border-radius:24px;
          padding:40px 30px;
          transition:.3s;
        }

        .card:hover{
          transform:translateY(-8px);
          box-shadow:0 18px 40px rgba(0,0,0,.08);
        }

        .icon{
          width:80px;
          height:80px;
          margin:0 auto;
          background:#A67C52;
          color:white;
          border-radius:22px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:34px;
        }

        .card h3{
          margin-top:28px;
          font-size:28px;
          color:#2D2D2D;
        }

        .card p{
          margin-top:18px;
          color:#666;
          line-height:1.8;
          font-size:17px;
        }

        @media (max-width:992px){

          h1{
            font-size:52px;
          }

          .about h2{
            font-size:40px;
          }

          .cardContainer{
            grid-template-columns:1fr;
            max-width:500px;
            margin:70px auto 0;
          }

        }

        @media (max-width:768px){

          .hero{
            padding:80px 20px;
          }

          h1{
            font-size:40px;
            line-height:1.3;
          }

          .subtitle{
            font-size:16px;
            line-height:1.8;
          }

          .buttons{
            flex-direction:column;
            gap:18px;
          }

          .loginBtn,
          .registerBtn{
            width:100%;
            max-width:320px;
          }

          .heroImage{
            margin-top:50px;
          }

          .heroImage img{
            max-width:320px;
          }

          .about{
            padding:80px 20px;
          }

          .about h2{
            font-size:34px;
          }

          .aboutText{
            font-size:16px;
          }

          .card{
            padding:35px 25px;
          }

        }

      `}</style>

    </>
  );
}