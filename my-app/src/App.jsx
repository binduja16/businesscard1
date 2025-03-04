import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
    import './App.css';

    function App() {
      const [name, setName] = useState('');
      const [title, setTitle] = useState('');
      const [company, setCompany] = useState('');
      const [phone, setPhone] = useState('');
      const [email, setEmail] = useState('');
      const [website, setWebsite] = useState('');
      const [color, setColor] = useState('#f0f0f0');
      const [logo, setLogo] = useState(null);
      const cardRef = useRef(null);

      const handleNameChange = (e) => setName(e.target.value);
      const handleTitleChange = (e) => setTitle(e.target.value);
      const handleCompanyChange = (e) => setCompany(e.target.value);
      const handlePhoneChange = (e) => setPhone(e.target.value);
      const handleEmailChange = (e) => setEmail(e.target.value);
      const handleWebsiteChange = (e) => setWebsite(e.target.value);
      const handleColorChange = (e) => setColor(e.target.value);
      const handleLogoChange = (e) => {
        if (e.target.files && e.target.files[0]) {
          setLogo(URL.createObjectURL(e.target.files[0]));
        }
      };

      const downloadCard = async () => {
        if (!cardRef.current) return;
        try {
          const element = cardRef.current;
          const canvas = await html2canvas(element, {
            useCORS: true,
            backgroundColor: color,
            scale: 2
          });
          const dataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'business-card.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error generating image:', error);
        }
      };

      return (
        <div className="app-container">
          <h1>Business Card Generator</h1>

          <div className="input-section">
            <h2>Enter Your Information:</h2>
            <input type="text" placeholder="Name" value={name} onChange={handleNameChange} />
            <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
            <input type="text" placeholder="Company" value={company} onChange={handleCompanyChange} />
            <input type="text" placeholder="Phone" value={phone} onChange={handlePhoneChange} />
            <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
            <input type="text" placeholder="Website" value={website} onChange={handleWebsiteChange} />
            <input type="color" value={color} onChange={handleColorChange} />
            <input type="file" accept="image/*" onChange={handleLogoChange} />
          </div>

          <div className="card-preview" ref={cardRef} style={{ backgroundColor: color }}>
            {logo && <img src={logo} alt="Logo" className="logo" />}
            <div className="card-content">
              {name && <p className="name">{name}</p>}
              {title && <p className="title">{title}</p>}
              {company && <p className="company">{company}</p>}
              {phone && <p className="contact">Phone: {phone}</p>}
              {email && <p className="contact">Email: {email}</p>}
              {website && <p className="contact">Website: {website}</p>}
            </div>
          </div>

          <button onClick={downloadCard}>Download Business Card</button>
        </div>
      );
    }

    export default App;
