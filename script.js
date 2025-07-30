// Enhanced HYDROBLT GSAP Animation System
class HydrobltGSAPAnimations {
  constructor() {
    this.masterTimeline = gsap.timeline({ paused: true })
    this.isAnimationComplete = false
    this.phrases = ["#phrase1", "#phrase2", "#phrase3", "#phrase4"]

    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    this.init()
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.setup())
    } else {
      this.setup()
    }
  }

  setup() {
    // Set initial states for all animated elements
    this.setInitialStates()

    // Build the master timeline
    this.buildMasterTimeline()

    // Setup form handling
    this.setupFormHandling()

    // Setup scroll-triggered animations
    this.setupScrollAnimations()

    // Create background particles
    this.createBackgroundParticles()

    // Setup preloader
    this.setupPreloader()
  }

  setInitialStates() {
    // Set all elements to their initial hidden states
    gsap.set("#top-lightning-icon", {
      opacity: 0,
      scale: 0.8,
    })

    gsap.set(".animated-phrase", {
      opacity: 0,
      y: 20,
      scale: 0.95,
    })

    gsap.set("#main-lightning-bolt", {
      opacity: 0,
      filter:
        "drop-shadow(0 0 40px #ffffcc) drop-shadow(0 0 80px #ffffcc) drop-shadow(0 0 120px rgba(255, 255, 204, 0.7))",
    })

    gsap.set("#main-lightning-bolt path", {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
    })

    gsap.set("#product-name", {
      opacity: 0,
      scale: 0.8,
      filter: "brightness(0)",
    })

    gsap.set("#product-shot-silhouette", {
      opacity: 0,
      y: 20,
      scale: 0.8,
    })

    gsap.set("#waiting-list-section", {
      opacity: 0,
      y: 50,
    })

    gsap.set("#thunder-flash", {
      opacity: 0,
    })
  }

  buildMasterTimeline() {
    // 1. Top Lightning Icon Entrance
    this.masterTimeline
      .fromTo(
        "#top-lightning-icon",
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "elastic.out(1, 0.7)",
        }
      )
      // Continuous pulsing glow for top lightning icon
      .to(
        "#top-lightning-icon",
        {
          filter: "drop-shadow(0 0 10px #ffcc00) drop-shadow(0 0 30px #ffcc00)",
          repeat: -1,
          yoyo: true,
          duration: 1.5,
          ease: "sine.inOut",
        },
        "<0.5"
      )

    // 2. Verbiage sequence with thunder effects
    this.phrases.forEach((phrase, index) => {
      const delay = index * 0.8

      // Thunder visual effect (body flash/dim)
      this.masterTimeline
        .to(
          "body",
          {
            backgroundColor: "#030308",
            duration: 0.05,
            yoyo: true,
            repeat: 1,
            ease: "power1.out",
          },
          `1.5+=${delay}`
        )

        // Screen vibration/shake
        .to(
          "body",
          {
            x: "+=5",
            y: "+=5",
            duration: 0.05,
            yoyo: true,
            repeat: 1,
            ease: "sine.inOut",
          },
          "<"
        )

        // Phrase reveal
        .fromTo(
          phrase,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          "<0.1"
        )
    })

    // 3. Pause after phrases
    this.masterTimeline.to({}, { duration: 0.5 })

    // 4. Refined Lightning bolt strike sequence with screen shake
    this.masterTimeline
      // Generate random lightning path before animation
      .call(() => {
        const lightningPathElement = document.getElementById("lightning-path")
        const randomPathData = this.generateRandomLightningPath()
        lightningPathElement.setAttribute("d", randomPathData)
      })

      // Step 1: Immediate, Blinding Full-Screen Flash
      .to("body", {
        backgroundColor: "#FFFFFF",
        duration: 0.01,
        ease: "none",
      })

      // Step 2: Simultaneous Sharp Screen Shake
      .fromTo(
        "body",
        { x: 0, y: 0 },
        {
          x: gsap.utils.random(-12, 12),
          y: gsap.utils.random(-12, 12),
          duration: 0.03,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
        "<"
      )

      // Thunder flash effect using the thunder-flash element
      .to(
        "#thunder-flash",
        {
          opacity: 0.9,
          duration: 0.01,
          ease: "none",
        },
        "<"
      )

      // Step 3: Jagged Bolt "Draw" Animation
      .to(
        "#main-lightning-bolt",
        {
          opacity: 1,
          duration: 0.01,
          ease: "none",
        },
        "<"
      )

      // Rapidly draw the lightning path
      .to(
        "#main-lightning-bolt path",
        {
          strokeDashoffset: 0,
          duration: 0.08,
          ease: "power2.out",
        },
        "<"
      )

      // Add intense glow effect during strike
      .to(
        "#main-lightning-bolt",
        {
          filter:
            "drop-shadow(0 0 50px #ffffcc) drop-shadow(0 0 100px #ffffcc) drop-shadow(0 0 150px rgba(255, 255, 204, 0.9))",
          duration: 0.02,
          ease: "none",
        },
        "<0.03"
      )

      // Step 4: Rapid Disappearance of Flash and Bolt
      // Return body background to original (slower fade for afterglow)
      .to(
        "body",
        {
          backgroundColor: "#0d0e1a",
          duration: 0.3,
          ease: "power1.out",
        },
        "+=0.05"
      )

      // Thunder flash fade-out
      .to(
        "#thunder-flash",
        {
          opacity: 0,
          duration: 0.15,
          ease: "power1.out",
        },
        "<"
      )

      // Lightning bolt rapid disappearance
      .to(
        "#main-lightning-bolt",
        {
          opacity: 0,
          duration: 0.15,
          ease: "power1.out",
        },
        "+=0.08"
      )

      // Reset stroke-dashoffset for next animation
      .set("#main-lightning-bolt path", {
        strokeDashoffset: 1000,
      })

    // 5. HYDROBLT reveal with electric effect
    this.masterTimeline
      .fromTo(
        "#product-name",
        {
          opacity: 0,
          scale: 0.8,
          filter: "brightness(0)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "brightness(1)",
          duration: 0.8,
          ease: "elastic.out(1, 0.7)",
        }
      )

      // Enhanced random electric glow animation
      .call(
        () => {
          this.createElectricGlowAnimation()
        },
        null,
        "<0.3"
      )

      // Product silhouette reveal
      .fromTo(
        "#product-shot-silhouette",
        { opacity: 0, y: 20, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: "power2.out",
        },
        "<0.2"
      )

      // Start continuous animations for the product droplet
      .call(
        () => {
          this.startProductDropletAnimations()
        },
        null,
        "<0.5"
      )

    // Mark animation as complete
    this.masterTimeline.call(() => {
      this.isAnimationComplete = true
    })
  }

  startProductDropletAnimations() {
    const droplet = document.getElementById("product-shot-silhouette")
    if (!droplet) return

    // Subtle pulse/glow animation
    gsap.to(droplet, {
      filter: "drop-shadow(0 0 12px #00ffff) drop-shadow(0 0 24px #00ffff40)",
      duration: 1.8,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })

    // Optional subtle bobbing animation (very imperceptible)
    gsap.to(droplet, {
      y: -3,
      duration: 1.5,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    })
  }

  setupScrollAnimations() {
    // Waiting list section scroll reveal (if ScrollTrigger is available)
    if (typeof ScrollTrigger !== "undefined") {
      ScrollTrigger.create({
        trigger: "#waiting-list-section",
        start: "top 80%",
        animation: gsap.fromTo(
          "#waiting-list-section",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
          }
        ),
      })
    } else {
      // Fallback: reveal after main animation
      this.masterTimeline.fromTo(
        "#waiting-list-section",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        "+=1"
      )
    }
  }

  setupFormHandling() {
    const form = document.getElementById("waiting-list-form")
    const emailInput = document.getElementById("email-input")
    const submitButton = document.getElementById("join-now-button")
    const successMessage = document.getElementById("success-message")

    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        const email = emailInput.value.trim()

        // Basic email validation
        if (this.validateEmail(email)) {
          // Animate button success
          gsap.to(submitButton, {
            backgroundColor: "#00ff88",
            scale: 0.95,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          })

          // Show success message
          gsap.fromTo(
            successMessage,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
            }
          )

          // Clear form
          emailInput.value = ""

          // Hide success message after 3 seconds
          setTimeout(() => {
            gsap.to(successMessage, {
              opacity: 0,
              y: -20,
              duration: 0.3,
              ease: "power2.in",
            })
          }, 3000)
        } else {
          // Animate error state
          gsap.to(submitButton, {
            backgroundColor: "#ff4444",
            x: "+=10",
            duration: 0.1,
            yoyo: true,
            repeat: 3,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.to(submitButton, {
                backgroundColor: "#00aaff",
                duration: 0.3,
              })
            },
          })

          gsap.to(emailInput, {
            borderColor: "#ff4444",
            duration: 0.2,
            yoyo: true,
            repeat: 1,
          })
        }
      })
    }
  }

  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  generateRandomLightningPath() {
    // Configuration for lightning generation
    const config = {
      startX: 50,
      startY: 0,
      endY: 100,
      segments: gsap.utils.random(6, 10, 1), // Random number of main segments
      maxDeviation: 25, // Maximum horizontal deviation from center
      branchProbability: 0.3, // 30% chance of branch at each segment
      branchLength: 15, // Maximum branch length
    }

    let pathData = `M${config.startX},${config.startY}`
    let currentX = config.startX
    let currentY = config.startY

    // Calculate segment height
    const segmentHeight = config.endY / config.segments

    // Generate main lightning path
    for (let i = 1; i <= config.segments; i++) {
      // Calculate next point
      const targetY = i * segmentHeight

      // Random horizontal deviation, but constrain to stay within bounds
      const deviation = gsap.utils.random(
        -config.maxDeviation,
        config.maxDeviation
      )
      let nextX = config.startX + deviation

      // Ensure we stay within viewBox bounds (with some padding)
      nextX = Math.max(15, Math.min(85, nextX))

      // Add some randomness to Y position
      const yVariation = gsap.utils.random(-3, 3)
      const nextY = targetY + yVariation

      // Use L for sharp jagged lines or Q for slightly curved segments
      if (Math.random() < 0.7) {
        // Sharp line (most common)
        pathData += ` L${nextX},${nextY}`
      } else {
        // Slight curve for variation
        const controlX = currentX + gsap.utils.random(-10, 10)
        const controlY = (currentY + nextY) / 2
        pathData += ` Q${controlX},${controlY} ${nextX},${nextY}`
      }

      // Generate random branches
      if (
        Math.random() < config.branchProbability &&
        i > 1 &&
        i < config.segments - 1
      ) {
        const branchDirection = Math.random() < 0.5 ? -1 : 1
        const branchEndX =
          nextX + branchDirection * gsap.utils.random(10, config.branchLength)
        const branchEndY = nextY + gsap.utils.random(5, 15)

        // Ensure branch stays in bounds
        const clampedBranchX = Math.max(5, Math.min(95, branchEndX))

        // Add branch (move to branch start, draw branch, move back)
        pathData += ` M${nextX},${nextY} L${clampedBranchX},${branchEndY} M${nextX},${nextY}`
      }

      currentX = nextX
      currentY = nextY
    }

    // Add some final variation to the end point
    const finalX = currentX + gsap.utils.random(-8, 8)
    const finalY = config.endY
    pathData += ` L${Math.max(10, Math.min(90, finalX))},${finalY}`

    return pathData
  }

  setupPreloader() {
    window.addEventListener("load", () => {
      const preloader = document.getElementById("preloader")
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => {
          preloader.classList.add("hidden")
          // Start the main animation timeline after preloader disappears
          this.startAnimation()
        },
      })
    })
  }

  createBackgroundParticles() {
    const container = document.getElementById("particle-container")
    if (!container) return

    // Create 70 particles for subtle background effect
    for (let i = 0; i < 70; i++) {
      this.createAndAnimateParticle(container)
    }
  }

  createAndAnimateParticle(container) {
    const particle = document.createElement("div")
    particle.className = "particle"
    container.appendChild(particle)

    const startX = gsap.utils.random(0, window.innerWidth)
    const startY = gsap.utils.random(0, window.innerHeight)
    const size = gsap.utils.random(2, 5)
    const duration = gsap.utils.random(15, 40) // Enhanced: Longer, more varied drift duration
    const delay = gsap.utils.random(0, 10) // Random start delay

    gsap.set(particle, {
      x: startX,
      y: startY,
      width: size,
      height: size,
      opacity: 0,
      backgroundColor: `rgba(255, 255, 255, ${gsap.utils.random(0.3, 0.8)})`, // Base white color
    })

    // 1. Enhanced Opacity Animation
    gsap.to(particle, {
      opacity: gsap.utils.random(0.5, 1),
      duration: gsap.utils.random(2, 5),
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
      delay: delay,
    })

    // 2. Enhanced Drift Animation with Curves
    gsap.to(particle, {
      x: `+=${gsap.utils.random(-150, 150)}`, // Enhanced: More varied drift range
      y: `-=${gsap.utils.random(
        window.innerHeight * 0.7,
        window.innerHeight * 1.8
      )}`, // Enhanced: More varied upward drift
      duration: duration,
      ease: "power1.out", // Enhanced: Subtle curve instead of linear
      repeat: -1,
      delay: delay,
      onRepeat: () => {
        // Reset particle position for continuous loop
        gsap.set(particle, {
          x: gsap.utils.random(0, window.innerWidth),
          y: window.innerHeight,
        })
      },
    })

    // 3. Color Flicker Animation (30-50% of particles)
    if (Math.random() < 0.4) {
      // 40% chance for color flicker
      const colorFlickerDelay = gsap.utils.random(5, 20) // Random delay before starting

      gsap
        .timeline({ delay: colorFlickerDelay, repeat: -1 })
        .to(particle, {
          backgroundColor:
            Math.random() < 0.5
              ? "rgba(0, 255, 255, 0.4)" // Cyan flicker
              : "rgba(150, 0, 255, 0.3)", // Purple flicker
          duration: gsap.utils.random(0.1, 0.3),
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        })
        .to(
          {},
          {
            duration: gsap.utils.random(3, 8), // Random pause between flickers
          }
        )
    }

    // 4. Size Fluctuation Animation
    const sizeDelay = gsap.utils.random(0, 5) // Random delay for size animation

    gsap.to(particle, {
      scale: gsap.utils.random(0.8, 1.2),
      duration: gsap.utils.random(2, 5),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: sizeDelay,
    })

    // 5. Optional Subtle Glow Flicker (for extra electrical feel)
    if (Math.random() < 0.2) {
      // 20% chance for glow effect
      const glowDelay = gsap.utils.random(8, 25)

      gsap
        .timeline({ delay: glowDelay, repeat: -1 })
        .to(particle, {
          filter: "drop-shadow(0 0 4px rgba(0, 255, 255, 0.6))",
          duration: gsap.utils.random(0.05, 0.15),
          ease: "power2.out",
          yoyo: true,
          repeat: 3, // Quick multiple flickers
        })
        .to(particle, {
          filter: "none",
          duration: 0.1,
        })
        .to(
          {},
          {
            duration: gsap.utils.random(10, 20), // Long pause between glow sequences
          }
        )
    }
  }

  createElectricGlowAnimation() {
    // Create a complex timeline for random electric glow effects
    const hydrobltGlowTL = gsap.timeline({ repeat: -1, ease: "none" })

    // Base glow settings
    const baseGlow =
      "drop-shadow(0 0 15px #00ffff) drop-shadow(0 0 30px #00ffff) drop-shadow(0 0 50px #00ffff)"
    const mediumGlow =
      "drop-shadow(0 0 20px #00ffff) drop-shadow(0 0 40px #00ffff) drop-shadow(0 0 70px #00ffff)"
    const brightGlow =
      "drop-shadow(0 0 25px #00ffff) drop-shadow(0 0 50px #00ffff) drop-shadow(0 0 90px #00ffff)"
    const intenseGlow =
      "drop-shadow(0 0 30px #00ffff) drop-shadow(0 0 60px #00ffff) drop-shadow(0 0 120px #00ffff)"

    // Base colors for electric effect
    const baseColor = "#ccffff"
    const brightColor = "#e0ffff"
    const intenseColor = "#ffffff"

    // Create randomized electric sequence
    hydrobltGlowTL
      // Initial stable glow
      .set("#product-name", {
        filter: baseGlow,
        color: baseColor,
        x: 0,
        y: 0,
      })

      // Random small flickers (frequent, subtle)
      .to(
        "#product-name",
        {
          filter: mediumGlow,
          duration: gsap.utils.random(0.05, 0.15),
          ease: "power2.out",
        },
        "+=0.2"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          duration: gsap.utils.random(0.1, 0.2),
          ease: "power1.inOut",
        },
        "+=0.05"
      )

      // Subtle jitter with brightness
      .to(
        "#product-name",
        {
          x: gsap.utils.random(-2, 2),
          y: gsap.utils.random(-1, 1),
          filter: brightGlow,
          color: brightColor,
          duration: gsap.utils.random(0.08, 0.12),
          ease: "power1.out",
        },
        "+=0.3"
      )
      .to(
        "#product-name",
        {
          x: 0,
          y: 0,
          filter: baseGlow,
          color: baseColor,
          duration: gsap.utils.random(0.15, 0.25),
          ease: "power1.inOut",
        },
        "+=0.02"
      )

      // Occasional intense surge
      .to(
        "#product-name",
        {
          filter: intenseGlow,
          color: intenseColor,
          scale: 1.008,
          x: gsap.utils.random(-2, 2),
          y: gsap.utils.random(-1, 1),
          duration: gsap.utils.random(0.04, 0.08),
          ease: "power2.out",
        },
        "+=0.5"
      )
      .to(
        "#product-name",
        {
          filter: mediumGlow,
          color: brightColor,
          scale: 1,
          x: 0,
          y: 0,
          duration: gsap.utils.random(0.1, 0.2),
          ease: "power2.inOut",
        },
        "+=0.01"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          color: baseColor,
          duration: gsap.utils.random(0.2, 0.4),
          ease: "power1.out",
        },
        "+=0.05"
      )

      // Quick double flash
      .to(
        "#product-name",
        {
          filter: brightGlow,
          duration: 0.06,
          ease: "power2.out",
        },
        "+=0.4"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          duration: 0.08,
          ease: "power1.inOut",
        },
        "+=0.02"
      )
      .to(
        "#product-name",
        {
          filter: intenseGlow,
          color: brightColor,
          x: gsap.utils.random(-1, 1),
          duration: 0.05,
          ease: "power2.out",
        },
        "+=0.1"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          color: baseColor,
          x: 0,
          duration: gsap.utils.random(0.15, 0.3),
          ease: "power1.out",
        },
        "+=0.03"
      )

      // Micro flickers
      .to(
        "#product-name",
        {
          filter: mediumGlow,
          duration: 0.04,
          ease: "none",
        },
        "+=0.2"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          duration: 0.06,
          ease: "none",
        },
        "+=0.02"
      )
      .to(
        "#product-name",
        {
          filter: mediumGlow,
          duration: 0.03,
          ease: "none",
        },
        "+=0.1"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          duration: gsap.utils.random(0.1, 0.2),
          ease: "power1.inOut",
        },
        "+=0.02"
      )

      // Extended bright pulse with jitter
      .to(
        "#product-name",
        {
          filter: intenseGlow,
          color: intenseColor,
          scale: 1.005,
          x: gsap.utils.random(-2, 2),
          y: gsap.utils.random(-2, 2),
          duration: gsap.utils.random(0.12, 0.18),
          ease: "power1.out",
        },
        "+=0.6"
      )
      .to(
        "#product-name",
        {
          x: gsap.utils.random(-1, 1),
          y: gsap.utils.random(-1, 1),
          duration: 0.05,
          ease: "power1.inOut",
        },
        "+=0.05"
      )
      .to(
        "#product-name",
        {
          filter: brightGlow,
          color: brightColor,
          scale: 1,
          x: 0,
          y: 0,
          duration: gsap.utils.random(0.2, 0.35),
          ease: "power2.out",
        },
        "+=0.03"
      )
      .to(
        "#product-name",
        {
          filter: baseGlow,
          color: baseColor,
          duration: gsap.utils.random(0.3, 0.5),
          ease: "power1.inOut",
        },
        "+=0.1"
      )

      // Random wait before loop restarts
      .to(
        "#product-name",
        {
          duration: gsap.utils.random(0.5, 1.2),
        },
        "+=0.2"
      )

    // Store reference for potential cleanup
    this.electricGlowTimeline = hydrobltGlowTL
  }

  createWaitingListAnimations() {
    // Random Electric Glow for "Join the Waiting List" heading
    this.createWaitingListTitleGlow()

    // Random Electric Glow for each Benefit Card (independent animations)
    this.createBenefitCardsGlow()
  }

  createWaitingListTitleGlow() {
    const waitingListTitle = document.querySelector("#waiting-list-section h2")
    if (!waitingListTitle) return

    // Create independent timeline for the heading glow
    const titleGlowTL = gsap.timeline({
      repeat: -1,
      delay: gsap.utils.random(0, 2), // Random initial delay for de-synchronization
    })

    // Define electric glow levels with color variations
    const baseGlow = "drop-shadow(0 0 8px #ffcc00)"
    const mediumGlow =
      "drop-shadow(0 0 15px #ffcc00) drop-shadow(0 0 25px #ffcc0080)"
    const brightGlow =
      "drop-shadow(0 0 20px #ffe680) drop-shadow(0 0 35px #ffcc0080) drop-shadow(0 0 50px #ffcc0040)"
    const intenseGlow =
      "drop-shadow(0 0 25px #ffe680) drop-shadow(0 0 40px #ffcc00) drop-shadow(0 0 60px #ffcc0060)"

    // Base color variations for electric effect
    const baseColor = "#ffffff"
    const brightColor = "#fffaf0"

    titleGlowTL
      // Random flickering sequence
      .to(waitingListTitle, {
        filter: mediumGlow,
        color: baseColor,
        x: gsap.utils.random(-1, 1),
        y: gsap.utils.random(-1, 1),
        duration: gsap.utils.random(0.15, 0.3),
        ease: "power1.inOut",
      })
      .to(waitingListTitle, {
        filter: brightGlow,
        color: brightColor,
        x: gsap.utils.random(-2, 2),
        y: gsap.utils.random(-1, 1),
        duration: gsap.utils.random(0.08, 0.15),
        ease: "power2.out",
      })
      .to(waitingListTitle, {
        filter: baseGlow,
        color: baseColor,
        x: 0,
        y: 0,
        duration: gsap.utils.random(0.2, 0.4),
        ease: "power1.out",
      })

      // Random pause
      .to(waitingListTitle, {
        duration: gsap.utils.random(0.8, 2.0),
      })

      // Intense surge effect
      .to(waitingListTitle, {
        filter: intenseGlow,
        color: brightColor,
        x: gsap.utils.random(-2, 2),
        y: gsap.utils.random(-1, 1),
        duration: gsap.utils.random(0.05, 0.1),
        ease: "power2.out",
      })
      .to(waitingListTitle, {
        filter: mediumGlow,
        color: baseColor,
        x: gsap.utils.random(-1, 1),
        y: gsap.utils.random(-1, 1),
        duration: gsap.utils.random(0.06, 0.12),
        ease: "power1.inOut",
      })
      .to(waitingListTitle, {
        filter: baseGlow,
        color: baseColor,
        x: 0,
        y: 0,
        duration: gsap.utils.random(0.3, 0.6),
        ease: "power1.out",
      })

      // Long random pause before loop restarts
      .to(waitingListTitle, {
        duration: gsap.utils.random(1.5, 4.0),
      })

    // Store reference for potential cleanup
    this.waitingListTitleGlow = titleGlowTL
  }

  createBenefitCardsGlow() {
    const benefitCards = document.querySelectorAll(".benefit-card")

    benefitCards.forEach((card, index) => {
      const icon = card.querySelector("svg")
      const titleElement = card.querySelector("h4")
      const textElement = card.querySelector("p")

      if (!icon || !titleElement || !textElement) return

      // Create independent timeline for each benefit card
      const cardGlowTL = gsap.timeline({
        repeat: -1,
        delay: gsap.utils.random(0, 3) + index * 0.5, // Staggered start for de-synchronization
      })

      // Define subtle glow levels for benefit cards
      const iconBaseGlow = "drop-shadow(0 0 3px #ffcc00)"
      const iconMediumGlow =
        "drop-shadow(0 0 8px #ffcc00) drop-shadow(0 0 15px #ffcc0040)"
      const iconBrightGlow =
        "drop-shadow(0 0 12px #ffe680) drop-shadow(0 0 20px #ffcc0060)"

      const textBaseGlow = "drop-shadow(0 0 2px #e0e0ff)"
      const textMediumGlow =
        "drop-shadow(0 0 5px #e0e0ff) drop-shadow(0 0 8px #e0e0ff40)"

      // Base stroke colors for icons
      const baseStroke = "#ffcc00"
      const brightStroke = "#fff"

      cardGlowTL
        // Gentle pulse sequence
        .to(icon, {
          filter: iconMediumGlow,
          stroke: baseStroke,
          duration: gsap.utils.random(0.4, 0.8),
          ease: "power1.inOut",
        })
        .to(
          [titleElement, textElement],
          {
            filter: textMediumGlow,
            duration: gsap.utils.random(0.3, 0.6),
            ease: "power1.inOut",
          },
          "<0.1"
        )

        // Brief bright flash
        .to(icon, {
          filter: iconBrightGlow,
          stroke: brightStroke,
          duration: gsap.utils.random(0.1, 0.2),
          ease: "power2.out",
        })

        // Return to base
        .to(icon, {
          filter: iconBaseGlow,
          stroke: baseStroke,
          duration: gsap.utils.random(0.3, 0.5),
          ease: "power1.out",
        })
        .to(
          [titleElement, textElement],
          {
            filter: textBaseGlow,
            duration: gsap.utils.random(0.4, 0.7),
            ease: "power1.out",
          },
          "<"
        )

        // Random long pause before next cycle
        .to(icon, {
          duration: gsap.utils.random(2.0, 5.0),
        })

      // Store reference for potential cleanup
      if (!this.benefitCardGlows) this.benefitCardGlows = []
      this.benefitCardGlows.push(cardGlowTL)
    })
  }

  initializeHoverAnimations() {
    // Button icon rotation on hover
    const joinButton = document.querySelector(".join-button")
    const buttonIcon = document.querySelector(".join-button svg")

    if (joinButton && buttonIcon) {
      // Set initial rotation to 0
      gsap.set(buttonIcon, { rotation: 0 })

      joinButton.addEventListener("mouseenter", () => {
        gsap.to(buttonIcon, {
          rotation: 360,
          duration: 0.6,
          ease: "power2.out",
        })
      })

      joinButton.addEventListener("mouseleave", () => {
        gsap.to(buttonIcon, {
          rotation: 0,
          duration: 0.4,
          ease: "power1.out",
        })
      })
    }

    // Benefit cards hover animations (separate from glow effects)
    const benefitCards = document.querySelectorAll(".benefit-card")
    benefitCards.forEach((card) => {
      const icon = card.querySelector("svg")

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          boxShadow: "0 10px 30px rgba(255, 204, 0, 0.3)",
          duration: 0.3,
          ease: "power2.out",
        })

        if (icon) {
          gsap.to(icon, {
            scale: 1.1,
            filter: "drop-shadow(0 0 10px #00ffff)",
            duration: 0.3,
            ease: "power2.out",
          })
        }
      })

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          boxShadow: "0 5px 15px rgba(255, 204, 0, 0.1)",
          duration: 0.3,
          ease: "power1.out",
        })

        if (icon) {
          gsap.to(icon, {
            scale: 1,
            filter: "none",
            duration: 0.3,
            ease: "power1.out",
          })
        }
      })
    })
  }

  initializeFormAnimations() {
    // Form submission animation
    const form = document.querySelector("#waiting-list-form")
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault()

        // Button loading animation
        const button = form.querySelector(".join-button")
        const buttonText = button.querySelector("span")
        const buttonIcon = button.querySelector("svg")

        // Disable button
        button.disabled = true

        // Animate button to loading state
        gsap.to(buttonIcon, {
          rotation: 720,
          duration: 1,
          ease: "power2.inOut",
        })

        gsap.to(buttonText, {
          opacity: 0.6,
          duration: 0.3,
        })

        // Simulate form submission
        setTimeout(() => {
          // Success animation
          gsap.to(button, {
            backgroundColor: "#00ff00",
            duration: 0.5,
            ease: "power2.out",
          })

          gsap.to(buttonText, {
            opacity: 1,
            duration: 0.3,
          })

          buttonText.textContent = "JOINED!"

          // Reset after 2 seconds
          setTimeout(() => {
            gsap.to(button, {
              backgroundColor: "#ffcc00",
              duration: 0.5,
            })
            buttonText.textContent = "JOIN NOW"
            button.disabled = false
            form.reset()
          }, 2000)
        }, 1500)
      })
    }
  }

  startAnimation() {
    // Start the master timeline
    this.masterTimeline.play()

    // Initialize all waiting list animations
    this.createWaitingListAnimations()
    this.initializeHoverAnimations()
    this.initializeFormAnimations()
  }

  // Public methods for animation control
  restartAnimation() {
    this.masterTimeline.restart()
  }

  pauseAnimation() {
    this.masterTimeline.pause()
  }

  resumeAnimation() {
    this.masterTimeline.resume()
  }
}

// Initialize the animation system when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Create global instance
  window.hydrobltAnimations = new HydrobltGSAPAnimations()

  // Optional: Add keyboard controls for development
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && e.ctrlKey) {
      e.preventDefault()
      window.hydrobltAnimations.restartAnimation()
      console.log("Animation restarted")
    }
  })
})

// Additional utility functions for thunder effects
function triggerThunderEffect() {
  gsap.to("body", {
    backgroundColor: "#ffffff",
    duration: 0.05,
    yoyo: true,
    repeat: 1,
    ease: "power1.out",
  })
}

function triggerLightningGlow(element) {
  gsap.to(element, {
    filter: "drop-shadow(0 0 30px #00ffff) drop-shadow(0 0 60px #00ffff)",
    duration: 0.1,
    yoyo: true,
    repeat: 1,
    ease: "power2.out",
  })
}

// Initialize GSAP settings for better performance
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
})

console.log("HYDROBLT GSAP Animation System Loaded")
