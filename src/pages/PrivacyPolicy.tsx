import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-[#121212] to-[#0A0A0A] min-h-screen text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-xl p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-white/80 mb-6">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Introduction</h2>
            <p className="text-white/80 mb-4">
              At Zantaku ("we," "our," or "us"), we respect your privacy and are committed to protecting your personal information. 
              This Privacy Policy describes how we collect, use, and share information when you use our website and services.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p className="text-white/80 mb-4">
              We collect information you provide directly to us, such as when you create an account, update your profile, 
              use interactive features, participate in surveys, or communicate with us. This may include:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li>Account information (name, email, username, password)</li>
              <li>Profile information (profile picture, bio, preferences)</li>
              <li>Content you share (comments, ratings, reviews)</li>
              <li>Communications you send to us</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Automatically Collected Information</h2>
            <p className="text-white/80 mb-4">
              When you access or use our services, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li>Log information (IP address, browser type, pages visited, time spent)</li>
              <li>Device information (hardware model, operating system)</li>
              <li>Location information (as permitted by you and your device)</li>
              <li>Cookie and similar technology information</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4" id="adsense">Google AdSense</h2>
            <p className="text-white/80 mb-4">
              We use Google AdSense, a web advertising service provided by Google Inc., to display advertisements on our website. 
              Google AdSense uses cookies and web beacons to help us display personalized content and analyze website traffic.
            </p>
            <p className="text-white/80 mb-4">
              Google AdSense may collect information about your:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li>Browsing behavior on our website and other sites</li>
              <li>IP address</li>
              <li>Geographic location</li>
              <li>Browser type and settings</li>
              <li>Device information</li>
            </ul>
            <p className="text-white/80 mb-4">
              This information helps provide you with interest-based advertising. Google's ability to use and share information 
              collected by Google AdSense is restricted by the <a href="https://policies.google.com/technologies/partner-sites" className="text-neo-crimson hover:underline" target="_blank" rel="noopener noreferrer">Google AdSense Terms of Service</a> and 
              the <a href="https://policies.google.com/privacy" className="text-neo-crimson hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>.
            </p>
            <p className="text-white/80 mb-4">
              You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-neo-crimson hover:underline" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a> or 
              the <a href="http://www.aboutads.info/choices/" className="text-neo-crimson hover:underline" target="_blank" rel="noopener noreferrer">Network Advertising Initiative opt-out page</a>.
            </p>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Information</h2>
            <p className="text-white/80 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Develop new products and services</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect, investigate, and prevent fraudulent or illegal activities</li>
              <li>Personalize and improve your experience</li>
              <li>Facilitate contests, sweepstakes, and promotions</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Sharing of Information</h2>
            <p className="text-white/80 mb-4">
              We may share information as follows:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li>With service providers, consultants, and other third-party vendors</li>
              <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition</li>
              <li>If required by law or to respond to legal process</li>
              <li>To protect the rights, property, and safety of our users and the public</li>
              <li>With your consent or at your direction</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Your Choices</h2>
            <p className="text-white/80 mb-4">
              You can access and update certain information about you through your account settings. You can also:
            </p>
            <ul className="list-disc pl-6 mb-6 text-white/80">
              <li>Opt out of promotional communications</li>
              <li>Set browser cookies preferences</li>
              <li>Request deletion of your personal information</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p className="text-white/80 mb-4">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-white/80 mb-4">
              Email: privacy@zantaku.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 