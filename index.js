document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const body = document.body;
    const mainContent = document.getElementById('mainContent');
    const dashboard = document.getElementById('dashboard');
    const authModal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const switchAuth = document.getElementById('switchAuth');
    const switchText = document.getElementById('switchText');
    const loginBtn = document.getElementById('loginBtn');
    const parentBtn = document.getElementById('parentBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authNavItem = document.getElementById('authNavItem');
    const storiesCarousel = document.getElementById('storiesCarousel');
    const readerModal = document.getElementById('readerModal');
    const childModal = document.getElementById('childModal');
    const addChildBtn = document.getElementById('addChildBtn');
    const childForm = document.getElementById('childForm');
    const childList = document.getElementById('childList');
    const recentActivity = document.getElementById('recentActivity');
  

    
    // Sample data for popular stories
    const popularStories = [
        {
            id: 1,
            title: "The Magic Forest",
            age: "5-7",
            rating: 4.8,
            type: "fantasy",
            image: "images/magical.png",
            content: "Once upon a time, in a magical forest filled with talking animals and sparkling trees, a young explorer named Lily discovered a hidden path. As she followed it, she met a wise old owl who gave her a special mission - to return the stolen colors to the rainbow! Along the way, Lily helped a squirrel find its lost acorns, convinced a grumpy bear to share honey with bees, and solved the riddle of the singing stones. In the end, she found the colors hidden in a crystal cave and restored the rainbow's brilliance. The forest celebrated with a grand party, and Lily learned that kindness and courage can solve even the biggest problems."
        },
        {
            id: 2,
            title: "Robot Friends",
            age: "7-9",
            rating: 4.6,
            type: "scifi",
            image: "images/robot.png",
            content: "In the year 2145, 10-year-old Max built his first robot from spare parts - a little companion he named Bolt. To his surprise, Bolt came to life with a cheerful 'Beep-boop!' and amazing abilities. Together, they discovered that other household robots in their smart city were mysteriously malfunctioning. Following clues through neon-lit streets and high-tech parks, Max and Bolt uncovered a computer virus spread by an abandoned toy robot who just wanted friends. Using teamwork and clever programming, they fixed all the robots and created a robot club where no machine would ever feel lonely again. Max learned that technology works best when it brings people (and robots) together."
        },
        {
            id: 3,
            title: "Underwater Mystery",
            age: "6-8",
            rating: 4.7,
            type: "adventure",
            image: "images/underwater.png",
            content: "When Mia's submarine-shaped sandcastle was washed away by a wave, she never expected it would return as a real mini-submarine! Curious, she climbed in and found herself transported to Coral Kingdom, an underwater world where fish wore hats and seahorses delivered mail. But something was wrong - the kingdom's precious Pearl of Peace had gone missing, and without it, the ocean currents were becoming dangerously strong. With her new friend Finn the flying fish, Mia searched sunken ships, interviewed an octopus detective, and finally discovered the pearl inside a giant clam who didn't realize what it had. After returning the pearl, Mia was named Honorary Guardian of the Ocean before her submarine turned back into sand. She woke up on the beach with seashells in her pocket and the sound of laughing waves in her ears."
        },
        {
            id: 4,
            title: "The Kind Dragon",
            age: "4-6",
            rating: 5.0,
            type: "fantasy",
            image: "images/king.png",
            content: "Everyone in the village was afraid of the dragon on the mountain, but little Noah wasn't so sure. While picking berries one day, he found the dragon crying because it had burned its own birthday cake with its fiery sneezes. Noah helped bake a new cake (using his mom's fireproof recipe) and discovered the dragon, whose name was Puff, was actually very gentle. When the village baker got stuck in a tree, Puff flew to the rescue, and when winter came, Puff's warm breath melted the icy roads. The villagers threw Puff a thank-you party with extra-large cakes, and Noah gained both a best friend and an important lesson: never judge someone by their scales!"
        },
        {
            id: 5,
            title: "Space Adventure",
            age: "8-10",
            rating: 4.9,
            type: "scifi",
            image: "images/space.png",
            content: "During a school trip to the space museum, Jaden accidentally activated an ancient alien device that teleported him aboard a real spaceship! The ship's AI, named Nova, explained that Jaden had been chosen to represent Earth in the Galactic Friendship Games. As they zoomed past rainbow nebulae and through asteroid fields, Jaden competed in zero-gravity soccer, solved puzzles with tentacled mathematicians, and taught aliens how to high-five. When sabotage threatened to cancel the games, Jaden used his knowledge of teamwork from soccer to uncover the culprit - a lonely robot who just wanted attention. After fixing the problem together, Jaden won the Spirit of Cooperation award and was returned home just in time for dinner, with amazing stories that no one quite believed (except his little sister, who knew all along that space was awesome)."
        }
    ];

    
    // User authentication state
    let currentUser = null;
    let children = [
        // { name: "Arjun", age: 6, interests: "animals, princesses" },
        // { name: "Maya", age: 4, interests: "robots, dinosaurs" }
    ];

    // Populate popular stories
    function loadPopularStories() {
        storiesCarousel.innerHTML = '';
        popularStories.forEach(story => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            storyCard.innerHTML = `
                <div class="story-image" style="background-image: url('${story.image}');"></div>
                <div class="story-info">
                    <h3>${story.title}</h3>
                    <div class="story-meta">
                        <span>Age ${story.age}</span>
                        <span>⭐ ${story.rating}</span>
                    </div>
                    <button class="read-btn" data-id="${story.id}">Read Now</button>
                </div>
            `;
            storiesCarousel.appendChild(storyCard);
        });
    }

    // Load children list
    function loadChildren() {
        childList.innerHTML = '';
        children.forEach(child => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${child.name} (Age ${child.age})</span>
                <div class="child-actions">
                    <button>Progress</button>
                </div>
            `;
            childList.appendChild(li);
        });
    }

    // Initialize popular stories and children
    loadPopularStories();
    loadChildren();

    // Handle story reading
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('read-btn')) {
            const storyId = parseInt(e.target.getAttribute('data-id'));
            const story = popularStories.find(s => s.id === storyId);
            if (story) {
                document.getElementById('readerTitle').textContent = story.title;
                document.getElementById('readerImage').style.backgroundImage = `url('${story.image}')`;
                document.getElementById('readerStory').innerHTML = `<p>${story.content}</p>`;
                readerModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Add to recent activity if logged in
                if (currentUser) {
                    const activityItem = document.createElement('li');
                    activityItem.textContent = `Read "${story.title}"`;
                    recentActivity.insertBefore(activityItem, recentActivity.firstChild);
                    
                    // Update reading progress
                    const storiesRead = document.getElementById('storiesRead');
                    storiesRead.textContent = parseInt(storiesRead.textContent) + 1;
                    const progress = Math.min(100, (parseInt(storiesRead.textContent) / 5) * 100);
                    document.getElementById('readingProgress').style.width = `${progress}%`;
                }
            }
        }
    });

    // Close reader modal
    document.getElementById('closeReader').addEventListener('click', function() {
        readerModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    document.getElementById('closeReaderBtn').addEventListener('click', function() {
        readerModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Read story aloud
    document.getElementById('readStoryAloud').addEventListener('click', function() {
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance();
            speech.text = document.getElementById('readerTitle').textContent + ". " + 
                          document.getElementById('readerStory').textContent;
            window.speechSynthesis.speak(speech);
        } else {
            alert('Text-to-speech is not supported in your browser');
        }
    });

    // Check if user is logged in (from localStorage)
    function checkAuth() {
        const user = localStorage.getItem('littleTalesUser');
        if (user) {
            currentUser = JSON.parse(user);
            updateAuthUI();
        }
    }

    // Update UI based on auth state
    function updateAuthUI() {
        if (currentUser) {
            loginBtn.style.display = 'none';
            authNavItem.innerHTML = `
                <div class="user-nav">
                    <span>Hi, ${currentUser.name.split(' ')[0]}</span>
                    <div class="user-avatar">${currentUser.name.charAt(0)}</div>
                </div>
            `;
            
            // Initialize dashboard stats
            document.getElementById('storiesRead').textContent = '3';
            document.getElementById('readingProgress').style.width = '60%';
        } else {
            authNavItem.innerHTML = '<a href="#" id="loginBtn">Login</a>';
            // Re-attach the event listener to the new loginBtn
            document.getElementById('loginBtn').addEventListener('click', function(e) {
                e.preventDefault();
                authModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }
    }

    // Show login modal
    loginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        authModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Show parent dashboard
    parentBtn.addEventListener('click', function() {
        if (currentUser) {
            mainContent.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            authModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    });

    // Logout
    logoutBtn.addEventListener('click', function() {
        firebase.auth().signOut().then(() => {
            currentUser = null;
            localStorage.removeItem('littleTalesUser');
            mainContent.style.display = 'block';
            dashboard.style.display = 'none';
            updateAuthUI();
        });
    });

    // Close auth modal
    document.getElementById('closeAuth').addEventListener('click', function() {
        authModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    // Switch between login and register
    switchAuth.addEventListener('click', function(e) {
        e.preventDefault();
        if (loginForm.style.display === 'none') {
            loginForm.style.display = 'flex';
            registerForm.style.display = 'none';
            loginTab.classList.add('active');
            registerTab.classList.remove('active');
            switchText.textContent = "Don't have an account?";
            switchAuth.textContent = "Register";
        } else {
            loginForm.style.display = 'none';
            registerForm.style.display = 'flex';
            loginTab.classList.remove('active');
            registerTab.classList.add('active');
            switchText.textContent = "Already have an account?";
            switchAuth.textContent = "Login";
        }
    });

    // Tab clicks
    loginTab.addEventListener('click', function() {
        loginForm.style.display = 'flex';
        registerForm.style.display = 'none';
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        switchText.textContent = "Don't have an account?";
        switchAuth.textContent = "Register";
    });

    registerTab.addEventListener('click', function() {
        loginForm.style.display = 'none';
        registerForm.style.display = 'flex';
        loginTab.classList.remove('active');
        registerTab.classList.add('active');
        switchText.textContent = "Already have an account?";
        switchAuth.textContent = "Login";
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                currentUser = {
                    name: userCredential.user.displayName || userCredential.user.email,
                    email: userCredential.user.email
                };
                localStorage.setItem('littleTalesUser', JSON.stringify(currentUser));
                authModal.style.display = 'none';
                document.body.style.overflow = '';
                updateAuthUI();
            })
            .catch((error) => {
                document.getElementById('loginError').textContent = error.message;
                document.getElementById('loginError').style.display = 'block';
            });
    });

    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirm = document.getElementById('registerConfirm').value;

        if (password !== confirm) {
            document.getElementById('registerError').textContent = "Passwords don't match";
            document.getElementById('registerError').style.display = 'block';
            return;
        }
        if (password.length < 6) {
            document.getElementById('registerError').textContent = "Password must be at least 6 characters";
            document.getElementById('registerError').style.display = 'block';
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Optionally update display name
                return userCredential.user.updateProfile({ displayName: name }).then(() => userCredential);
            })
            .then((userCredential) => {
                currentUser = {
                    name: name,
                    email: userCredential.user.email
                };
                localStorage.setItem('littleTalesUser', JSON.stringify(currentUser));
                authModal.style.display = 'none';
                document.body.style.overflow = '';
                updateAuthUI();
                // Switch to login view for next time
                loginForm.style.display = 'flex';
                registerForm.style.display = 'none';
                loginTab.classList.add('active');
                registerTab.classList.remove('active');
                switchText.textContent = "Don't have an account?";
                switchAuth.textContent = "Register";
            })
            .catch((error) => {
                document.getElementById('registerError').textContent = error.message;
                document.getElementById('registerError').style.display = 'block';
            });
    });

    // Add child functionality
    addChildBtn.addEventListener('click', function() {
        childModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    document.getElementById('closeChildModal').addEventListener('click', function() {
        childModal.style.display = 'none';
        document.body.style.overflow = '';
    });

    childForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('childName').value;
        const age = document.getElementById('childAge').value;
        const interests = document.getElementById('childInterests').value;
        
        // Add new child
        children.push({ name, age, interests });
        loadChildren();
        
        // Add to recent activity
        const activityItem = document.createElement('li');
        activityItem.textContent = `Added ${name} (Age ${age})`;
        recentActivity.insertBefore(activityItem, recentActivity.firstChild);
        
        // Close modal
        childModal.style.display = 'none';
        document.body.style.overflow = '';
        childForm.reset();
    });

    // (Previous JavaScript code for story creation and other features remains the same)

    // Initialize authentication
    checkAuth();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            currentUser = {
                name: user.displayName || user.email,
                email: user.email
            };
            localStorage.setItem('littleTalesUser', JSON.stringify(currentUser));
            updateAuthUI();
        } else {
            currentUser = null;
            localStorage.removeItem('littleTalesUser');
            updateAuthUI();
        }
    });
});
