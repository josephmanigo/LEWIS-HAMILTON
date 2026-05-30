"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useMotionValue, type MotionValue } from "framer-motion"

const imageBase = "/images/generated/lewis-hamilton"

const calendar = [
  ["01", "Australia", "6-8 Mar"],
  ["02", "China", "13-15 Mar"],
  ["03", "Japan", "27-29 Mar"],
  ["04", "Bahrain", "10-12 Apr"],
  ["05", "Saudi Arabia", "17-19 Apr"],
  ["06", "Miami", "1-3 May"],
  ["07", "Canada", "22-24 May"],
  ["08", "Monaco", "5-7 Jun"],
  ["09", "Barcelona", "12-14 Jun"],
  ["10", "Austria", "26-28 Jun"],
  ["11", "Great Britain", "3-5 Jul"],
  ["12", "Belgium", "17-19 Jul"],
  ["13", "Hungary", "24-26 Jul"],
  ["14", "Netherlands", "21-23 Aug"],
  ["15", "Italy", "4-6 Sep"],
  ["16", "Spain", "11-13 Sep"],
  ["17", "Azerbaijan", "24-26 Sep"],
  ["18", "Singapore", "9-11 Oct"],
  ["19", "United States", "23-25 Oct"],
  ["20", "Mexico", "30 Oct-1 Nov"],
  ["21", "Brazil", "6-8 Nov"],
  ["22", "Las Vegas", "19-21 Nov"],
  ["23", "Qatar", "27-29 Nov"],
  ["24", "Abu Dhabi", "4-6 Dec"],
]

const anchors = [
  ["hero", "0vh"],
  ["on-track", "130vh"],
  ["off-track", "270vh"],
  ["garage", "410vh"],
  ["calendar", "540vh"],
]

/* ── spring config ── */
const smoothSpring = { stiffness: 45, damping: 20, restDelta: 0.001 }

/* ── Parallax image with depth ── */
function StoryImage({ src, alt, className, progress, drift = [0, 0], priority = false, imgClass = "" }: {
  src: string; alt: string; className: string; progress: MotionValue<number>; drift?: [number, number]; priority?: boolean; imgClass?: string;
}) {
  const y = useTransform(progress, [0, 1], [drift[0] + "vh", drift[1] + "vh"])
  return (
    <motion.div
      style={{ y, willChange: "transform" }}
      className={`absolute overflow-hidden border border-black/10 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.18)] ${className}`}
    >
      <Image src={src} alt={alt} fill priority={priority}
        sizes="(max-width: 768px) 78vw, 42vw" className={`object-cover ${imgClass}`} />
    </motion.div>
  )
}

function RedBlade({ className }: { className: string }) {
  return (
    <div className={`absolute bg-accent ${className}`}
      style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0 100%)" }} />
  )
}

function MetricCard({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div className={`absolute border border-black/15 bg-white p-5 max-md:p-3 shadow-[0_20px_70px_rgba(0,0,0,0.12)] ${className}`}>
      <div className="mb-4 max-md:mb-2 flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-black" />
        <span className="font-[family-name:var(--font-oswald)] text-xs max-md:text-[10px] font-bold uppercase text-black/55">{label}</span>
      </div>
      <div className="border-t border-black/25 pt-4 max-md:pt-2 font-[family-name:var(--font-oswald)] text-6xl max-md:text-4xl font-black leading-none text-black">
        {value}
      </div>
    </div>
  )
}

function NoteBlock({ kicker, title, body, className }: {
  kicker: string; title: string; body: string; className: string
}) {
  return (
    <div className={`absolute z-20 w-[28rem] max-w-[90vw] text-black max-md:max-w-none ${className}`}>
      <div className="mb-4 flex items-center gap-4 border-t border-black/35 pt-4 max-md:mb-3 max-md:gap-3 max-md:pt-3">
        <span className="h-2 w-2 rounded-full bg-black" />
        <span className="font-[family-name:var(--font-oswald)] text-xs font-bold uppercase text-black/55">{kicker}</span>
      </div>
      <h2 className="font-[family-name:var(--font-oswald)] text-4xl font-black uppercase leading-none md:text-[2.75rem] min-[1800px]:text-6xl max-md:text-[2.35rem]">
        {title}
      </h2>
      <p className="mt-5 text-sm font-medium leading-6 text-black/65 md:text-[15px] xl:text-base max-md:mt-3 max-md:text-[13px] max-md:leading-5">{body}</p>
    </div>
  )
}

function CalendarPanel() {
  return (
    <div className="absolute bottom-[8vh] left-[8vw] right-[8vw] z-20 grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6 lg:left-[44vw] lg:right-[5vw] max-md:grid-cols-2 max-md:bottom-[4vh] max-md:max-h-[45vh] max-md:overflow-y-auto max-md:left-[4vw] max-md:right-[4vw]">
      {calendar.map(([round, race, date]) => (
        <div key={round} className="border border-white/15 bg-black/55 p-3 backdrop-blur-sm">
          <div className="flex items-start justify-between gap-3">
            <span className="font-[family-name:var(--font-oswald)] text-2xl font-black leading-none text-accent">
              {round}
            </span>
            <span className="text-right text-[10px] font-bold uppercase text-white/45">{date}</span>
          </div>
          <p className="mt-3 font-[family-name:var(--font-oswald)] text-lg font-black uppercase leading-none text-white md:text-xl">
            {race}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function ScrollStory() {
  const { scrollYProgress: smoothProgress } = useScroll()

  /* ── OPENING panel — slides straight left through center ── */
  const openingOpacity = useTransform(smoothProgress, [0, 0.15, 0.22], [1, 1, 0])
  const openingX = useTransform(smoothProgress, [0, 0.22], ["0vw", "-60vw"])
  const openingY = useTransform(smoothProgress, [0, 0.22], ["0vh", "0vh"])
  const openingScale = useTransform(smoothProgress, [0, 0.22], [1, 0.96])
  const openingVis = useTransform(smoothProgress, (v: number) => v > 0.23 ? "hidden" : "visible")

  /* ── MAP panel — horizontal travel through center ── */
  const mapOpacity = useTransform(smoothProgress, [0.08, 0.17, 0.44, 0.51], [0, 1, 1, 0])
  const mapX = useTransform(smoothProgress, [0.10, 0.22, 0.36, 0.48], ["100vw", "0vw", "-80vw", "-160vw"])
  const mapY = useMotionValue(0)
  const mapVis = useTransform(smoothProgress, (v: number) => (v < 0.07 || v > 0.52) ? "hidden" : "visible")

  /* ── ON-TRACK cinematic panel ── */
  const onTrackOpacity = useTransform(smoothProgress, [0.42, 0.49, 0.62, 0.69], [0, 1, 1, 0])
  const onTrackTextX = useTransform(smoothProgress, [0.43, 0.68], ["62vw", "-118vw"])
  const onTrackBladeX = useTransform(smoothProgress, [0.43, 0.57, 0.69], ["76vw", "0vw", "-64vw"])
  const onTrackVis = useTransform(smoothProgress, (v: number) => (v < 0.41 || v > 0.70) ? "hidden" : "visible")

  /* ── JOURNEY panel — horizontal travel through center ── */
  const journeyOpacity = useTransform(smoothProgress, [0.62, 0.7, 0.90, 0.95], [0, 1, 1, 0])
  const journeyX = useTransform(smoothProgress, [0.64, 0.74, 0.88, 0.96], ["100vw", "0vw", "-120vw", "-200vw"])
  const journeyY = useMotionValue(0)
  const journeyVis = useTransform(smoothProgress, (v: number) => (v < 0.61 || v > 0.96) ? "hidden" : "visible")

  /* ── FINAL panel ── */
  const finalOpacity = useTransform(smoothProgress, [0.91, 0.95, 1], [0, 1, 1])
  const finalTextX = useTransform(smoothProgress, [0.91, 1], ["48vw", "-72vw"])
  const finalVis = useTransform(smoothProgress, (v: number) => v < 0.90 ? "hidden" : "visible")

  return (
    <section id="story" className="relative h-[640vh] bg-black">
      {anchors.map(([id, top]) => (
        <div key={id} id={id} className="absolute left-0 h-px w-px" style={{ top }} />
      ))}

      <div className="sticky top-0 h-screen overflow-hidden bg-[#f5f4ef]">
        {/* grid texture */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.055)_1px,transparent_1px)] bg-[size:56px_56px]" />

        {/* ─── OPENING ─── */}
        <motion.div
          style={{ visibility: openingVis, opacity: openingOpacity, x: openingX, y: openingY, scale: openingScale, willChange: "transform, opacity" }}
          className="absolute inset-0"
        >
          <div className="absolute left-[4vw] top-[18vh] z-0 max-md:z-20 font-[family-name:var(--font-oswald)] text-7xl font-black uppercase leading-[0.78] text-black tracking-tighter -skew-x-[15deg] md:max-xl:left-[5vw] md:max-xl:top-[20vh] md:max-xl:text-[6.4rem] xl:max-[1799px]:left-[5vw] xl:max-[1799px]:top-[20vh] xl:max-[1799px]:text-[9.2rem] min-[1800px]:text-[13rem] max-md:left-[6vw] max-md:top-[24vh] max-md:text-[3.75rem]">
            <span className="block text-transparent"
              style={{
                WebkitBackgroundClip: "text", backgroundClip: "text",
                backgroundImage: `url(${imageBase}/daylight-car.png)`,
                backgroundPosition: "center", backgroundSize: "cover"
              }}>
              LEWIS
            </span>
            <span className="block text-transparent"
              style={{
                WebkitBackgroundClip: "text", backgroundClip: "text",
                backgroundImage: `url(${imageBase}/daylight-car.png)`,
                backgroundPosition: "center", backgroundSize: "cover"
              }}>
              HAMILTON
            </span>
          </div>

          <div className="absolute right-[-2vw] top-[4vh] z-10 w-[34vw] min-w-[250px] md:max-xl:right-[3vw] md:max-xl:top-[13vh] md:max-xl:w-[20vw] md:max-xl:min-w-[150px] md:max-xl:max-w-[250px] xl:max-[1799px]:right-[2vw] xl:max-[1799px]:top-[15vh] xl:max-[1799px]:w-[28vw] xl:max-[1799px]:max-w-[390px] max-md:right-[4vw] max-md:top-[14vh] max-md:w-[30vw] max-md:min-w-[120px]">
            <img src="/logo.png" alt="Logo" className="w-full h-auto object-contain opacity-80" />
          </div>

          <StoryImage src={`${imageBase}/hero-portrait.png`} alt="Lewis Hamilton portrait"
            priority progress={smoothProgress} drift={[0, 0]} imgClass="object-[center_20%]"
            className="left-[45vw] top-[15vh] h-[40vh] w-[25vw] min-w-[280px] md:max-xl:left-[52vw] md:max-xl:top-[14vh] md:max-xl:h-[38vh] md:max-xl:w-[26vw] md:max-xl:min-w-[210px] xl:max-[1799px]:left-[52vw] xl:max-[1799px]:top-[15vh] xl:max-[1799px]:h-[40vh] xl:max-[1799px]:w-[25vw] xl:max-[1799px]:min-w-[300px] max-md:left-[20vw] max-md:top-[28vh] max-md:h-[35vh] max-md:w-[60vw] max-md:min-w-0" />
          <StoryImage src={`${imageBase}/hero-garage.png`} alt="Lewis Hamilton in the garage"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[53vw] top-[50vh] h-[30vh] w-[45vw] md:max-xl:left-[56vw] md:max-xl:top-[51vh] md:max-xl:h-[26vh] md:max-xl:w-[38vw] xl:max-[1799px]:left-[56vw] xl:max-[1799px]:top-[50vh] xl:max-[1799px]:h-[30vh] xl:max-[1799px]:w-[41vw] max-md:left-[10vw] max-md:top-[66vh] max-md:h-[22vh] max-md:w-[65vw]" />
          <StoryImage src={`${imageBase}/rain-pit-lane.png`} alt="Lewis Hamilton in a wet pit lane"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[23vw] top-[57vh] h-[35vh] w-[35vw] md:max-xl:left-[24vw] md:max-xl:top-[58vh] md:max-xl:h-[31vh] md:max-xl:w-[30vw] xl:max-[1799px]:left-[26vw] xl:max-[1799px]:top-[57vh] xl:max-[1799px]:h-[35vh] xl:max-[1799px]:w-[34vw] max-md:hidden" />

        </motion.div>

        {/* ─── MAP ─── */}
        <motion.div
          style={{ visibility: mapVis, opacity: mapOpacity, x: mapX, y: mapY, willChange: "transform, opacity" }}
          className="absolute left-0 top-0 h-screen w-[260vw]"
        >
          <NoteBlock kicker="On track" title="Race instinct"
            body="Brake feel, tyre life, weather, traffic, and the ability to turn pressure into clean lap time."
            className="left-[10vw] top-[22vh] max-md:left-[5vw] max-md:top-[10vh] max-md:w-[70vw]" />
          <MetricCard label="World titles" value="7" className="left-[52vw] top-[28vh] w-52 max-md:left-[5vw] max-md:top-[70vh] max-md:w-[30vw]" />
          <MetricCard label="Wins" value="103" className="left-[72vw] top-[38vh] w-60 max-md:left-[5vw] max-md:top-[40vh] max-md:w-[35vw]" />
          <MetricCard label="Poles" value="104" className="left-[97vw] top-[26vh] w-56 max-md:left-[95vw] max-md:top-[40vh] max-md:w-[35vw]" />
          <StoryImage src={`${imageBase}/garage-telemetry.png`} alt="Lewis Hamilton reviewing telemetry"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[42vw] top-[42vh] h-[38vh] w-[30vw] max-md:left-[45vw] max-md:top-[40vh] max-md:w-[45vw] max-md:h-[25vh]" />
          <StoryImage src={`${imageBase}/helmet-closeup.png`} alt="Lewis Hamilton helmet closeup"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[88vw] top-[46vh] h-[32vh] w-[26vw] max-md:left-[40vw] max-md:top-[70vh] max-md:w-[40vw] max-md:h-[25vh]" />
          <StoryImage src={`${imageBase}/fan-wave.png`} alt="Lewis Hamilton waving to fans"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[128vw] top-[24vh] h-[42vh] w-[30vw] max-md:left-[80vw] max-md:top-[10vh] max-md:w-[50vw] max-md:h-[25vh]" />
          <div className="absolute left-[118vw] top-[70vh] max-w-lg text-sm font-medium leading-6 text-black/65 max-md:left-[85vw] max-md:top-[70vh] max-md:w-[55vw]">
            Talent opens the door. The race is built by rhythm, feedback, decision-making, and the calm to execute when
            every sector matters.
          </div>
        </motion.div>

        {/* ─── ON-TRACK ─── */}
        <motion.div style={{ visibility: onTrackVis, opacity: onTrackOpacity, willChange: "opacity" }}
          className="absolute inset-0 overflow-hidden bg-black">
          <Image src={`${imageBase}/on-track-cockpit.png`} alt="Lewis Hamilton at speed"
            fill sizes="100vw" className="object-cover opacity-55" />
          <div className="absolute inset-0 bg-black/45" />
          <motion.div style={{ x: onTrackBladeX, willChange: "transform" }} className="absolute inset-0">
            <RedBlade className="left-[-8vw] top-[8vh] h-[24vh] w-[25vw]" />
            <RedBlade className="left-[6vw] top-[54vh] h-[10vh] w-[34vw]" />
            <RedBlade className="right-[3vw] top-[30vh] h-[32vh] w-[30vw]" />
          </motion.div>
          <motion.p style={{ x: onTrackTextX, willChange: "transform" }}
            className="absolute top-[38vh] whitespace-nowrap font-[family-name:var(--font-oswald)] text-7xl font-black italic uppercase leading-none text-white md:text-[9rem] max-md:text-5xl max-md:top-[45vh]">
            It is the mind that makes the difference
          </motion.p>
        </motion.div>

        {/* ─── JOURNEY ─── */}
        <motion.div
          style={{ visibility: journeyVis, opacity: journeyOpacity, x: journeyX, y: journeyY, willChange: "transform, opacity" }}
          className="absolute left-0 top-0 h-screen w-[260vw]"
        >
          <NoteBlock kicker="Off track" title="Beyond race day"
            body="Fashion, culture, activism, and a global platform that extends the racing story far beyond Sunday."
            className="left-[16vw] top-[24vh] max-md:left-[5vw] max-md:top-[10vh] max-md:w-[70vw]" />
          <StoryImage src={`${imageBase}/off-track-night.png`} alt="Lewis Hamilton off-track night portrait"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[58vw] top-[18vh] h-[46vh] w-[32vw] max-md:left-[15vw] max-md:top-[45vh] max-md:w-[50vw] max-md:h-[30vh]" />
          <StoryImage src={`${imageBase}/paddock-fashion.png`} alt="Lewis Hamilton paddock fashion portrait"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[92vw] top-[28vh] h-[46vh] w-[24vw] max-md:left-[80vw] max-md:top-[10vh] max-md:w-[45vw] max-md:h-[30vh]" />
          <NoteBlock kicker="Garage" title="The quiet work"
            body="Data, feedback, setup direction, and collaboration turn a car into a race weapon before lights out."
            className="left-[122vw] top-[22vh] md:max-xl:left-[138vw] md:max-xl:top-[14vh] md:max-xl:w-[50vw] xl:max-[1799px]:left-[126vw] xl:max-[1799px]:top-[18vh] xl:max-[1799px]:w-[40vw] max-md:left-[130vw] max-md:top-[8vh] max-md:w-[84vw]" />
          <StoryImage src={`${imageBase}/podium-trophy.png`} alt="Lewis Hamilton holding a trophy"
            progress={smoothProgress} drift={[0, 0]}
            className="left-[150vw] top-[26vh] h-[40vh] w-[34vw] md:max-xl:left-[190vw] md:max-xl:top-[22vh] md:max-xl:h-[44vh] md:max-xl:w-[28vw] xl:max-[1799px]:left-[168vw] xl:max-[1799px]:top-[22vh] xl:max-[1799px]:h-[42vh] xl:max-[1799px]:w-[30vw] max-md:left-[70vw] max-md:top-[66vh] max-md:w-[55vw] max-md:h-[27vh]" />
          <div className="absolute left-[138vw] top-[70vh] w-[44vw] border-t border-black/30 pt-6 text-sm font-medium leading-6 text-black/65 md:max-xl:left-[138vw] md:max-xl:top-[70vh] md:max-xl:w-[45vw] xl:max-[1799px]:left-[144vw] xl:max-[1799px]:top-[68vh] xl:max-[1799px]:w-[42vw] max-md:left-[130vw] max-md:top-[68vh] max-md:w-[84vw] max-md:pt-3 max-md:text-[13px] max-md:leading-5">
            The best laps look clean because the difficult parts have already been absorbed: balance changes, tyre
            windows, wind, traffic, strategy, and the exact words exchanged over the radio.
          </div>
        </motion.div>

        {/* ─── FINAL ─── */}
        <motion.div style={{ visibility: finalVis, opacity: finalOpacity, willChange: "opacity" }}
          className="absolute inset-0 overflow-hidden bg-black">
          <Image src={`${imageBase}/podium-celebration.png`} alt="Lewis Hamilton podium celebration"
            fill sizes="100vw" className="object-cover opacity-45" />
          <div className="absolute inset-0 bg-black/62" />
          <RedBlade className="right-[-5vw] top-[7vh] h-[26vh] w-[28vw]" />
          <RedBlade className="left-[-8vw] bottom-[12vh] h-[18vh] w-[36vw]" />
          <motion.p style={{ x: finalTextX, willChange: "transform" }}
            className="absolute top-[14vh] whitespace-nowrap font-[family-name:var(--font-oswald)] text-7xl font-black italic uppercase leading-none text-white md:text-[8rem] max-md:text-5xl max-md:top-[16vh]">
            More about hard work than talent
          </motion.p>
          <div className="absolute left-[7vw] top-[48vh] z-20 max-w-md text-white max-md:top-[28vh] max-md:w-[90vw]">
            <p className="font-[family-name:var(--font-oswald)] text-xs font-bold uppercase text-accent">
              Calendar
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-oswald)] text-6xl font-black uppercase leading-none md:text-8xl">
              2026
            </h2>
            <p className="mt-5 text-base font-medium leading-7 text-white/68">
              Twenty-four rounds, one red chapter, and a season-long map from Melbourne to Abu Dhabi.
            </p>
          </div>
          <CalendarPanel />
        </motion.div>
      </div>
    </section>
  )
}
