-- Seed data for wemake database
-- Using profile_id: d86f6b5c-c1bb-4b71-8708-e984a4df2f15

-- Categories
INSERT INTO categories (name, description) VALUES
('Productivity', 'Tools and apps to boost your productivity'),
('Design', 'Design tools and resources for creators'),
('Development', 'Development tools and frameworks'),
('Marketing', 'Marketing and growth tools'),
('Analytics', 'Analytics and data visualization tools');

-- Jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo, company_location, apply_url, job_type, location, salary_range) VALUES
('Senior Frontend Developer', 'Join our team to build amazing user experiences', 'Develop responsive web applications, collaborate with design team, optimize performance', '5+ years React experience, TypeScript, CSS expertise', 'Health insurance, remote work, flexible hours', 'React, TypeScript, CSS, Git', 'TechCorp', 'https://example.com/logo1.png', 'San Francisco, CA', 'https://example.com/apply1', 'full-time', 'hybrid', '$120,000 - $150,000'),
('Product Designer', 'Create beautiful and functional user interfaces', 'Design user flows, create prototypes, conduct user research', '3+ years design experience, Figma, user research skills', 'Competitive salary, creative environment, learning budget', 'Figma, Sketch, User Research, Prototyping', 'DesignStudio', 'https://example.com/logo2.png', 'New York, NY', 'https://example.com/apply2', 'full-time', 'on-site', '$100,000 - $120,000'),
('Backend Engineer', 'Build scalable backend systems', 'Design APIs, optimize database queries, ensure security', '4+ years backend experience, Node.js, PostgreSQL', 'Stock options, health benefits, remote work', 'Node.js, PostgreSQL, AWS, Docker', 'DataTech', 'https://example.com/logo3.png', 'Austin, TX', 'https://example.com/apply3', 'full-time', 'remote', '$150,000 - $250,000'),
('Marketing Manager', 'Drive growth and user acquisition', 'Develop marketing strategies, manage campaigns, analyze metrics', '3+ years marketing experience, digital marketing, analytics', 'Performance bonuses, flexible schedule, remote work', 'Digital Marketing, Analytics, SEO, Social Media', 'GrowthCo', 'https://example.com/logo4.png', 'Los Angeles, CA', 'https://example.com/apply4', 'full-time', 'hybrid', '$70,000 - $100,000'),
('DevOps Engineer', 'Maintain and improve our infrastructure', 'Manage cloud infrastructure, automate deployments, monitor systems', '3+ years DevOps experience, AWS, Kubernetes', 'Competitive salary, remote work, learning opportunities', 'AWS, Kubernetes, Docker, CI/CD', 'CloudTech', 'https://example.com/logo5.png', 'Seattle, WA', 'https://example.com/apply5', 'full-time', 'remote', '$150,000 - $250,000');

-- Products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, stats, profile_id, category_id) VALUES
('TaskMaster Pro', 'Organize your life with AI-powered task management', 'A smart task management app that uses AI to prioritize your work and help you stay focused on what matters most.', 'Simply add your tasks and our AI will automatically categorize, prioritize, and schedule them based on your productivity patterns.', 'https://example.com/icon1.png', 'https://taskmasterpro.com', '{"views": 1250, "reviews": 45}', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 1),
('DesignFlow', 'Streamline your design workflow', 'A comprehensive design tool that combines prototyping, collaboration, and handoff in one platform.', 'Create designs, share with team members, and generate developer-ready code automatically.', 'https://example.com/icon2.png', 'https://designflow.io', '{"views": 890, "reviews": 32}', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 2),
('CodeSync', 'Real-time collaborative coding', 'A powerful IDE that enables real-time collaboration for teams, with built-in code review and version control.', 'Open the editor, invite team members, and code together in real-time with live preview and instant feedback.', 'https://example.com/icon3.png', 'https://codesync.dev', '{"views": 2100, "reviews": 78}', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 3),
('GrowthTracker', 'Track and optimize your marketing campaigns', 'An all-in-one marketing analytics platform that helps you track, analyze, and optimize your marketing efforts.', 'Connect your marketing channels, set up tracking, and get real-time insights into your campaign performance.', 'https://example.com/icon4.png', 'https://growthtracker.com', '{"views": 650, "reviews": 23}', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 4),
('DataViz Pro', 'Create stunning data visualizations', 'Transform your data into beautiful, interactive visualizations that tell compelling stories.', 'Upload your data, choose from hundreds of chart types, and customize your visualizations with our intuitive editor.', 'https://example.com/icon5.png', 'https://datavizpro.com', '{"views": 1100, "reviews": 56}', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 5);

-- Reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 5, 'Amazing task management tool! The AI prioritization feature is a game-changer.'),
(2, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 4, 'Great design tool with excellent collaboration features. Highly recommended for teams.'),
(3, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 5, 'Real-time collaboration works flawlessly. This has transformed how our team codes together.'),
(4, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 4, 'Comprehensive analytics platform. The reporting features are incredibly detailed and useful.'),
(5, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 5, 'Beautiful visualizations and easy to use. Perfect for presenting data to stakeholders.');

-- Product Upvotes (Bridge table with composite primary key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15');

-- GPT Ideas
INSERT INTO gpt_ideas (idea, views, claimed_at, claimed_by) VALUES
('AI-powered personal finance advisor that analyzes spending patterns and provides personalized savings recommendations', 150, NULL, NULL),
('Virtual reality platform for remote team collaboration with 3D meeting spaces', 89, NULL, NULL),
('Smart home automation system that learns user preferences and optimizes energy usage', 234, NULL, NULL),
('Blockchain-based platform for transparent supply chain tracking', 67, NULL, NULL),
('Mobile app for mental health tracking with AI-powered mood analysis and therapy recommendations', 312, NULL, NULL);

-- GPT Ideas Likes (Bridge table with composite primary key)
INSERT INTO gpt_ideas_likes (gpt_idea_id, profile_id) VALUES
(1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15');

-- Topics
INSERT INTO topics (name, slug) VALUES
('Product Development', 'product-development'),
('Design Tips', 'design-tips'),
('Tech News', 'tech-news'),
('Startup Advice', 'startup-advice'),
('Career Growth', 'career-growth');

-- Posts
INSERT INTO posts (title, content, profile_id, topic_id) VALUES
('How to Build a Successful MVP', 'Building an MVP is crucial for startup success. Here are the key principles I learned from building multiple products...', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 1),
('Design Principles Every Developer Should Know', 'Understanding basic design principles can significantly improve your UI/UX skills. Let me share what I learned...', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 2),
('The Future of AI in Software Development', 'AI is transforming how we write code. Here are the most promising developments and how they will change our workflow...', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 3),
('From Idea to Launch: My Startup Journey', 'I want to share my experience building and launching my first startup. Here are the lessons learned and mistakes to avoid...', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 4),
('Advancing Your Tech Career in 2024', 'The tech industry is evolving rapidly. Here are the skills and strategies you need to advance your career this year...', 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 5);

-- Post Upvotes (Bridge table with composite primary key)
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15');

-- Post Replies
INSERT INTO post_replies (post_id, parent_id, profile_id, reply) VALUES
(1, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Great insights! I especially agree with the point about user feedback being crucial for MVP development.'),
(2, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'This is exactly what I needed! The design principles you mentioned are so important for creating better user experiences.'),
(3, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Fascinating read! I am curious about how AI will impact junior developers in the coming years.'),
(4, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Thank you for sharing your journey! The lessons about customer validation really resonated with me.'),
(5, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Excellent advice! I am currently working on improving my skills in the areas you mentioned.');

-- Teams
INSERT INTO teams (team_id, product_name, team_size, equity_split, product_stage, roles, product_description) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'EcoTracker', 4, 25, 'mvp', 'Frontend Developer, Backend Developer, Designer, Product Manager', 'A mobile app that helps users track their carbon footprint and suggests eco-friendly alternatives.'),
('550e8400-e29b-41d4-a716-446655440002', 'HealthSync', 3, 33, 'prototype', 'Full Stack Developer, UI/UX Designer, Data Scientist', 'A health monitoring platform that syncs data from various devices and provides personalized health insights.'),
('550e8400-e29b-41d4-a716-446655440003', 'LearnFlow', 5, 20, 'launched', 'Frontend Developer, Backend Developer, Designer, Marketing Specialist, Content Creator', 'An adaptive learning platform that personalizes educational content based on individual learning styles.'),
('550e8400-e29b-41d4-a716-446655440004', 'SmartHome Hub', 2, 50, 'idea', 'Hardware Engineer, Software Developer', 'A centralized smart home control system that integrates with all your IoT devices.'),
('550e8400-e29b-41d4-a716-446655440005', 'FreelanceConnect', 6, 16, 'mvp', 'Frontend Developer, Backend Developer, Designer, Marketing Manager, Sales Representative, Customer Success', 'A platform connecting freelancers with clients, featuring project management and payment processing.');

-- Message Rooms
INSERT INTO message_rooms (message_room_id) VALUES
(DEFAULT),
(DEFAULT),
(DEFAULT),
(DEFAULT),
(DEFAULT);

-- Message Room Members (Bridge table with composite primary key)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15');

-- Messages
INSERT INTO messages (message_room_id, sender_id, content, seen) VALUES
(1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Hi there! I am interested in collaborating on a new project.', false),
(2, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Thanks for the feedback on my product!', true),
(3, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Would you like to join our team for the upcoming hackathon?', false),
(4, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'Great work on the latest update!', true),
(5, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'I have some questions about the project requirements.', false);

-- Notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type) VALUES
('d86f6b5c-c1bb-4b71-8708-e984a4df2f15', 1, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'review'),
(NULL, NULL, 1, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'reply'),
('d86f6b5c-c1bb-4b71-8708-e984a4df2f15', NULL, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'follow'),
(NULL, 2, NULL, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'mention'),
('d86f6b5c-c1bb-4b71-8708-e984a4df2f15', NULL, 3, 'd86f6b5c-c1bb-4b71-8708-e984a4df2f15', 'reply'); 