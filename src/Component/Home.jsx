import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {

  const [editing, setEditing] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [editingButtonId, setEditingButtonId] = useState(null);
  const [editingSection, setEditingSection] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  
  const [content, setContent] = useState({
    title: "A Luxurious Way To Enjoy Your Life",
    subtitle: "WELCOME TO HOTEL LUXURY",
    rooms_section: {
      subtitle: "DISCOVER CHOICES",
      title: "Luxury Rooms & Suites",
      rooms: [
        {"name": "Superior Suite", "price": "$200/night"},
        {"name": "Junior Suite", "price": "$150/night"},
        {"name": "Deluxe Room", "price": "$120/night"},
        {"name": "Double Room", "price": "$100/night"},
        {"name": "Family Room", "price": "$180/night"}
      ]
    },
    amenities_section: {
      subtitle: "INTRODUCING OUR SERVICES",
      title: "Amenities That You Can Enjoy",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      amenities: [
        {
          title: "Spa, Massages & Sauna",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Workout & Yoga Rooms", 
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Multiple Cuisines & Beverages",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    },
    testimonials_section: {
      subtitle: "WHAT OUR CLIENT",
      title: "What Our Client Says",
      testimonial: {
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        client_name: "Jackson Dean",
        client_role: "Guest"
      }
    },
    team_section: {
      subtitle: "MEET OUR TEAM",
      title: "Expert Team Persons",
      members: [
        {"name": "Laurent Wayne", "role": "Hotel Manager"},
        {"name": "Josh Mullins", "role": "Senior Manager"},
        {"name": "Andrea Hugh", "role": "Room Service"},
        {"name": "James Norman", "role": "Food Service"}
      ]
    },
    footer: {
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      subscribe_text: "Don't miss to subscribe our news. Kindly fill the form below.",
      copyright: "© 2025 Imperial Grand Hotel. All Rights Reserved."
    }
  });
  
  const [buttons, setButtons] = useState([]);
  const [newBtn, setNewBtn] = useState({ text: "", url: "", style: {} });
  const [editingBtn, setEditingBtn] = useState({ text: "", url: "", style: {} });
  const [editValue, setEditValue] = useState("");

  // Load initial data from backend
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const response = await fetch("https://sauravagrawal588.pythonanywhere.com/");
      const data = await response.json();
      if (data.content) {
        setContent(data.content);
      }
      if (data.buttons) {
        setButtons(data.buttons);
      }
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const handleContentUpdate = async (section, field, value, index = null) => {
    try {
      const payload = {
        section: section,
        field: field,
        value: value,
        index: index
      };

      const response = await fetch("https://sauravagrawal588.pythonanywhere.com/update-content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.updated_content) {
        setContent(result.updated_content);
      }
      console.log("Content updated:", result);
    } catch (error) {
      console.error("Error updating content:", error);
    }
  };

  const startEditing = (section, field, currentValue, index = null) => {
    setEditing(true);
    setEditingSection(section);
    setEditingField(field);
    setEditingIndex(index);
    setEditValue(currentValue);
  };

  const saveEdit = async () => {
    await handleContentUpdate(editingSection, editingField, editValue, editingIndex);
    setEditing(false);
    setEditingSection(null);
    setEditingField(null);
    setEditingIndex(null);
    setEditValue("");
  };

  const cancelEdit = () => {
    setEditing(false);
    setEditingSection(null);
    setEditingField(null);
    setEditingIndex(null);
    setEditValue("");
  };

  const EditableText = ({ section, field, value, className, tag = "span", index = null }) => {
    const isEditing = editing && editingSection === section && editingField === field && editingIndex === index;
    
    if (isEditing) {
      const InputComponent = tag === "textarea" ? "textarea" : "input";
      return (
        <div className="edit-controls">
          <InputComponent
            type={tag === "input" ? "text" : undefined}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="edit-input"
            rows={tag === "textarea" ? 3 : undefined}
            autoFocus
            onFocus={(e) => {
              // Use setTimeout to ensure the text is selected after render
              setTimeout(() => {
                e.target.setSelectionRange(e.target.value.length, e.target.value.length);
              }, 0);
            }}
            onBlur={(e) => {
              // Prevent blur if user is still typing
              setTimeout(() => {
                if (document.activeElement !== e.target) {
                  e.target.focus();
                }
              }, 10);
            }}
          />
          <button onClick={saveEdit} className="save-btn">Save</button>
          <button onClick={cancelEdit} className="cancel-btn">Cancel</button>
        </div>
      );
    }

    const Component = tag === "h1" ? "h1" : tag === "h2" ? "h2" : tag === "h3" ? "h3" : tag === "p" ? "p" : "span";
    
    return (
      <div className="editable-section">
        <Component className={className}>{value}</Component>
        <button 
          onClick={() => startEditing(section, field, value, index)}
          className="edit-btn"
        >
          ✏️
        </button>
      </div>
    );
  };

  const handleSave = async (field, value) => {
    setEditing(false);
    setEditingField(null);

    const payload = {
      component: "hero-section",
      field: field,
      value: value,
    };

    try {
      const res = await fetch("https://sauravagrawal588.pythonanywhere.com/update-section", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("Server response:", result);
    } catch (error) {
      console.error("Error sending edit:", error);
    }
  };

  const handleAddButton = async () => {
    if (!newBtn.text || !newBtn.url) return;
    
    try {
      const response = await fetch("https://sauravagrawal588.pythonanywhere.com/add-button", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBtn),
      });
      
      const result = await response.json();
      if (result.button) {
        setButtons([...buttons, result.button]);
      }
      setNewBtn({ text: "", url: "", style: {} });
      setEditing(false);
      setEditingField(null);
    } catch (error) {
      console.error("Error adding button:", error);
    }
  };

  const handleEditButton = async (buttonId) => {
    try {
      const response = await fetch(`https://sauravagrawal588.pythonanywhere.com/edit-button/${buttonId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingBtn),
      });
      
      const result = await response.json();
      if (result.button) {
        setButtons(buttons.map(btn => 
          btn.id === buttonId ? result.button : btn
        ));
      }
      setEditingButtonId(null);
      setEditingBtn({ text: "", url: "", style: {} });
    } catch (error) {
      console.error("Error editing button:", error);
    }
  };

  const handleDeleteButton = async (buttonId) => {
    try {
      const response = await fetch(`https://sauravagrawal588.pythonanywhere.com/delete-button/${buttonId}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        setButtons(buttons.filter(btn => btn.id !== buttonId));
      }
    } catch (error) {
      console.error("Error deleting button:", error);
    }
  };

  const startEditingButton = (button) => {
    setEditingButtonId(button.id);
    setEditingBtn({
      text: button.text,
      url: button.url,
      style: button.style || {}
    });
  };

  return (
    <div className="home">
      {/* Header */}
      <header className="header">
        <div className="logo">
          <span className="logo-icon">IH</span>
          <span className="logo-text">IMPERIAL GRAND HOTEL</span>
        </div>
        <nav className="nav">
          <Link to="/home">HOME</Link>
          <a href="#about">ABOUT</a>
          <Link to="/service">SERVICE</Link>
          <a href="#pages">PAGES</a>
          <a href="#contact">CONTACT US</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <EditableText 
            section="hero"
            field="subtitle"
            value={content.subtitle}
            className="hero-subtitle"
            tag="p"
          />

          <EditableText 
            section="hero"
            field="title"
            value={content.title}
            className="hero-title"
            tag="h1"
          />

          <button className="discover-btn">Discover Rooms →</button>

          {/* Dynamic Buttons - keep existing button functionality */}
          <div className="dynamic-buttons">
            {buttons.map((btn) => (
              <div key={btn.id} className="button-container">
                {editingButtonId === btn.id ? (
                  <div className="edit-button-controls">
                    <input
                      type="text"
                      value={editingBtn.text}
                      onChange={(e) => setEditingBtn({...editingBtn, text: e.target.value})}
                      placeholder="Button Text"
                      className="button-input"
                      autoFocus
                    />
                    <input
                      type="text"
                      value={editingBtn.url}
                      onChange={(e) => setEditingBtn({...editingBtn, url: e.target.value})}
                      placeholder="Button URL"
                      className="button-input"
                    />
                    <div className="style-controls">
                      <label>Background Color:</label>
                      <input
                        type="color"
                        value={editingBtn.style.backgroundColor || "#007bff"}
                        onChange={(e) => setEditingBtn({
                          ...editingBtn, 
                          style: {...editingBtn.style, backgroundColor: e.target.value}
                        })}
                      />
                      <label>Text Color:</label>
                      <input
                        type="color"
                        value={editingBtn.style.color || "#ffffff"}
                        onChange={(e) => setEditingBtn({
                          ...editingBtn, 
                          style: {...editingBtn.style, color: e.target.value}
                        })}
                      />
                    </div>
                    <div className="button-actions">
                      <button onClick={() => handleEditButton(btn.id)} className="save-btn">Save</button>
                      <button onClick={() => setEditingButtonId(null)} className="cancel-btn">Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div className="button-display">
                    <a
                      href={btn.url}
                      className="dynamic-btn"
                      style={btn.style}
                    >
                      {btn.text}
                    </a>
                    <div className="button-edit-controls">
                      <button 
                        onClick={() => startEditingButton(btn)}
                        className="edit-btn-small"
                        title="Edit Button"
                      >
                        ✏️
                      </button>
                      <button 
                        onClick={() => handleDeleteButton(btn.id)}
                        className="delete-btn-small"
                        title="Delete Button"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Add Button Controls */}
          {editing && editingField === 'buttons' ? (
            <div className="add-button-controls">
              <h4>Add New Button</h4>
              <input
                type="text"
                placeholder="Button Text"
                value={newBtn.text}
                onChange={(e) => setNewBtn({ ...newBtn, text: e.target.value })}
                className="button-input"
                autoFocus
              />
              <input
                type="text"
                placeholder="URL (e.g., tel:+911234567890)"
                value={newBtn.url}
                onChange={(e) => setNewBtn({ ...newBtn, url: e.target.value })}
                className="button-input"
              />
              <div className="style-controls">
                <label>Background Color:</label>
                <input
                  type="color"
                  value={newBtn.style.backgroundColor || "#007bff"}
                  onChange={(e) => setNewBtn({
                    ...newBtn, 
                    style: {...newBtn.style, backgroundColor: e.target.value}
                  })}
                />
                <label>Text Color:</label>
                <input
                  type="color"
                  value={newBtn.style.color || "#ffffff"}
                  onChange={(e) => setNewBtn({
                    ...newBtn, 
                    style: {...newBtn.style, color: e.target.value}
                  })}
                />
              </div>
              <div className="button-actions">
                <button onClick={handleAddButton} className="add-btn">Add Button</button>
                <button 
                  onClick={() => {setEditing(false); setEditingField(null);}}
                  className="cancel-btn"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => {setEditing(true); setEditingField('buttons');}}
              className="add-button-btn"
            >
              + Add Button
            </button>
          )}
        </div>
        
        {/* Booking Form */}
        <div className="booking-form">
          <div className="form-group">
            <label>Check In</label>
            <input type="date" defaultValue="2023-12-25" />
          </div>
          <div className="form-group">
            <label>Check Out</label>
            <input type="date" defaultValue="2023-12-28" />
          </div>
          <div className="form-group">
            <label>Room</label>
            <select>
              <option>1 Room, 2 Adults</option>
            </select>
          </div>
          <button className="check-availability">CHECK AVAILABILITY</button>
        </div>
      </section>

      {/* Rooms Section */}
      <section className="rooms-section">
        <div className="section-header">
          <EditableText 
            section="rooms_section"
            field="subtitle"
            value={content.rooms_section?.subtitle}
            className="section-subtitle"
            tag="p"
          />
          <EditableText 
            section="rooms_section"
            field="title"
            value={content.rooms_section?.title}
            className="section-title"
            tag="h2"
          />
        </div>
        
        <div className="rooms-grid">
          {content.rooms_section?.rooms?.map((room, index) => (
            <div key={index} className={`room-card ${index < 2 ? 'large' : ''}`}>
              <div className="room-content">
                <EditableText 
                  section="rooms_section"
                  field="rooms"
                  value={room.name}
                  className=""
                  tag="h3"
                  index={index}
                />
                <EditableText 
                  section="rooms_section"
                  field="rooms"
                  value={room.price}
                  className=""
                  tag="p"
                  index={index}
                />
                {index === 0 && (
                  <div className="room-amenities">
                    <span>🛏️</span>
                    <span>📺</span>
                    <span>🌐</span>
                    <span>❄️</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities Section */}
      <section className="amenities-section">
        <div className="amenities-content">
          <div className="amenities-text">
            <EditableText 
              section="amenities_section"
              field="subtitle"
              value={content.amenities_section?.subtitle}
              className="section-subtitle"
              tag="p"
            />
            <EditableText 
              section="amenities_section"
              field="title"
              value={content.amenities_section?.title}
              className="section-title"
              tag="h2"
            />
            <EditableText 
              section="amenities_section"
              field="description"
              value={content.amenities_section?.description}
              className="amenities-description"
              tag="textarea"
            />
          </div>
          
          <div className="amenities-grid">
            {content.amenities_section?.amenities?.map((amenity, index) => (
              <div key={index} className={`amenity-card ${['spa-card', 'workout-card', 'cuisine-card'][index] || ''}`}>
                <div className="amenity-content">
                  <div className="amenity-icon">{['♨️', '🏋️', '🍽️'][index]}</div>
                  <EditableText 
                    section="amenities_section"
                    field="amenities"
                    value={amenity.title}
                    className=""
                    tag="h3"
                    index={index}
                  />
                  <EditableText 
                    section="amenities_section"
                    field="amenities"
                    value={amenity.description}
                    className=""
                    tag="textarea"
                    index={index}
                  />
                  <a href="#" className="amenity-link">Discover More →</a>
                </div>
              </div>
            ))}
            <div className="amenity-card empty-card"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-content">
          <div className="section-header">
            <EditableText 
              section="testimonials_section"
              field="subtitle"
              value={content.testimonials_section?.subtitle}
              className="section-subtitle"
              tag="p"
            />
            <EditableText 
              section="testimonials_section"
              field="title"
              value={content.testimonials_section?.title}
              className="section-title"
              tag="h2"
            />
          </div>
          
          <div className="testimonial-slider">
            <div className="testimonial-card active">
              <div className="testimonial-image">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=400" alt="Client" />
              </div>
              <div className="testimonial-content">
                <div className="stars">
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                  <span>⭐</span>
                </div>
                <EditableText 
                  section="testimonials_section"
                  field="testimonial.text"
                  value={content.testimonials_section?.testimonial?.text}
                  className="testimonial-text"
                  tag="textarea"
                />
                <div className="client-info">
                  <EditableText 
                    section="testimonials_section"
                    field="testimonial.client_name"
                    value={content.testimonials_section?.testimonial?.client_name}
                    className=""
                    tag="h4"
                  />
                  <EditableText 
                    section="testimonials_section"
                    field="testimonial.client_role"
                    value={content.testimonials_section?.testimonial?.client_role}
                    className=""
                    tag="span"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="testimonial-dots">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-content">
          <div className="section-header">
            <EditableText 
              section="team_section"
              field="subtitle"
              value={content.team_section?.subtitle}
              className="section-subtitle"
              tag="p"
            />
            <EditableText 
              section="team_section"
              field="title"
              value={content.team_section?.title}
              className="section-title"
              tag="h2"
            />
          </div>
          
          <div className="team-grid">
            {content.team_section?.members?.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image">
                  <img src={`https://images.unsplash.com/photo-${['1472099645785-5658abf4ff4e', '1519085360753-af0119f7cbe7', '1507003211169-0a1dd7228f2d', '1500648767791-00dcc994a43e'][index]}?ixlib=rb-4.0.3&w=400`} alt={member.name} />
                  <div className="social-overlay">
                    <div className="social-icons">
                      <a href="#" className="social-icon">📘</a>
                      <a href="#" className="social-icon">📷</a>
                      <a href="#" className="social-icon">🐦</a>
                    </div>
                  </div>
                </div>
                <div className="team-info">
                  <EditableText 
                    section="team_section"
                    field="members"
                    value={member.name}
                    className=""
                    tag="h3"
                    index={index}
                  />
                  <EditableText 
                    section="team_section"
                    field="members"
                    value={member.role}
                    className=""
                    tag="p"
                    index={index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section logo-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">IH</span>
              <div>
                <h3>IMPERIAL</h3>
                <p>GRAND HOTEL</p>
              </div>
            </div>
            <EditableText 
              section="footer"
              field="description"
              value={content.footer?.description}
              className="footer-description"
              tag="textarea"
            />
          </div>

          <div className="footer-section links-section">
            <h4>USEFUL LINKS</h4>
            <ul className="footer-links">
              <li><a href="#home">HOME</a></li>
              <li><a href="#about">ABOUT</a></li>
              <li><a href="#service">SERVICE</a></li>
              <li><a href="#room">ROOM</a></li>
            </ul>
          </div>

          <div className="footer-section subscribe-section">
            <h4>SUBSCRIBE</h4>
            <EditableText 
              section="footer"
              field="subscribe_text"
              value={content.footer?.subscribe_text}
              className="subscribe-text"
              tag="textarea"
            />
            <div className="subscribe-form">
              <input 
                type="email" 
                placeholder="Your Email Here" 
                className="email-input"
              />
              <button className="subscribe-btn">→</button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="social-icons-footer">
              <a href="#" className="social-icon-footer">🐦</a>
              <a href="#" className="social-icon-footer">📘</a>
              <a href="#" className="social-icon-footer">📷</a>
              <a href="#" className="social-icon-footer">📌</a>
              <a href="#" className="social-icon-footer">🌐</a>
            </div>
            
            <div className="footer-copyright">
              <EditableText 
                section="footer"
                field="copyright"
                value={content.footer?.copyright}
                className=""
                tag="p"
              />
            </div>
            
            <div className="footer-legal">
              <a href="#" className="legal-link">Privacy Policy</a>
              <a href="#" className="legal-link">Terms of Use</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
