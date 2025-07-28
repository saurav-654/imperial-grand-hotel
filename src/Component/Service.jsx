import React from 'react'
import { Link } from 'react-router-dom'
import './Service.css'

function Service() {
  return (
    <div className="service-page">
      {/* Header */}
      <header className="service-header">
        <div className="service-logo">
          <span className="service-logo-icon">IH</span>
          <span className="service-logo-text">IMPERIAL GRAND HOTEL</span>
        </div>
        <nav className="service-nav">
          <Link to="/home">HOME</Link>
          <a href="#about">ABOUT</a>
          <Link to="/service" className="active">SERVICE</Link>
          <a href="#pages">PAGES</a>
          <a href="#contact">CONTACT US</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="service-hero">
        <div className="hero-overlay">
          <div className="hero-navigation">
            <button className="nav-arrow nav-prev">❮</button>
            <button className="nav-arrow nav-next">❯</button>
          </div>
          <div className="hero-dots">
            <span className="dot"></span>
            <span className="dot active"></span>
            <span className="dot"></span>
          </div>
        </div>
      </section>

      {/* Service Content */}
      <section className="service-content">
        <div className="service-container">
          <div className="service-image">
            <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&w=600" alt="Multiple Cuisines & Beverages" />
            <div className="service-badge">
              <span>Best Deals</span>
              <span>Available Now</span>
            </div>
          </div>
          
          <div className="service-details">
            <h1 className="service-title">Multiple Cuisines & Beverages</h1>
            
            <div className="service-description">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod 
                tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>

            <div className="service-info">
              <div className="info-section">
                <h3>Hours</h3>
                <div className="hours-list">
                  <div className="hour-item">
                    <span className="time-icon">🕐</span>
                    <span>Breakfast: 07:00 AM - 11:00 AM [Daily]</span>
                  </div>
                  <div className="hour-item">
                    <span className="time-icon">🕐</span>
                    <span>Lunch: 12:00 PM - 03:00 PM [Daily]</span>
                  </div>
                  <div className="hour-item">
                    <span className="time-icon">🕐</span>
                    <span>Dinner: 06:00 PM - 11:00 PM [Daily]</span>
                  </div>
                </div>
              </div>

              <div className="info-section">
                <h3>Downloads</h3>
                <div className="downloads-list">
                  <a href="#" className="download-link">
                    📄 Food & Drinks Brochure (4.5mb download)
                  </a>
                </div>
              </div>

              <div className="info-section">
                <h3>Terrace</h3>
                <div className="terrace-info">
                  <span>Open and bellutifull</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Restaurant Menu Section */}
      <section className="menu-section">
        <div className="menu-container">
          <div className="menu-header">
            <h2>Restaurant Menu</h2>
            <div className="menu-nav">
              <span className="menu-nav-item active">Breakfast</span>
              <span className="menu-nav-item">Lunch</span>
              <span className="menu-nav-item">Dinner</span>
              <span className="menu-nav-item">Drinks</span>
              <span className="menu-nav-item">Snacks</span>
            </div>
          </div>

          <div className="menu-grid">
            {/* Appetizer Section */}
            <div className="menu-category appetizer-section">
              <h3 className="category-title">Appetizer</h3>
              
              <div className="menu-item">
                <div className="item-info">
                  <h4>Potato Salad</h4>
                  <p>Fresh Potato Salad With Cucumber, Tomato</p>
                </div>
                <span className="item-price">$25</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Cream Mushroom Soup</h4>
                  <p>Fresh Cream Mushroom With Hot Plate</p>
                </div>
                <span className="item-price">$30</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Caesar Salad</h4>
                  <p>Fresh Caesar Salad With Roasted Chicken Strips</p>
                </div>
                <span className="item-price">$30</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Chicken Quesadilla</h4>
                  <p>Roasted Tender Chicken With Cheese & Yogurt</p>
                </div>
                <span className="item-price">$45</span>
              </div>
            </div>

            {/* Main Course Section */}
            <div className="menu-category main-course-section">
              <h3 className="category-title">Main Course</h3>
              
              <div className="menu-item">
                <div className="item-info">
                  <h4>Aglio Olio</h4>
                  <p>Aglio Olio With Fresh Prawns And Parsley</p>
                </div>
                <span className="item-price">$45</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Gordon Bleu</h4>
                  <p>Fresh Gordon Bleu With Sweet & Sour Chicken</p>
                </div>
                <span className="item-price">$40</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Shredded Beef Burger</h4>
                  <p>Fresh Shredded Beef With Cheese & Fries</p>
                </div>
                <span className="item-price">$40</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Salmon Marinara</h4>
                  <p>Salmon Fillet With Special Marinara Sauce</p>
                </div>
                <span className="item-price">$50</span>
              </div>
            </div>

            {/* Drink Section */}
            <div className="menu-category drink-section">
              <h3 className="category-title">Drink</h3>
              
              <div className="menu-item">
                <div className="item-info">
                  <h4>Mineral Water</h4>
                  <p>Fresh Pure Mineral Water</p>
                </div>
                <span className="item-price">$5</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Fruit Juice</h4>
                  <p>Pure Juice</p>
                </div>
                <span className="item-price">$8</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Apple Chia Berry Fizz</h4>
                  <p>Pure Fresh Berry With Chia</p>
                </div>
                <span className="item-price">$7</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Cool Rime Chocolate Martini</h4>
                  <p>Fresh Pure Chocolate With Cool Cream</p>
                </div>
                <span className="item-price">$10</span>
              </div>
            </div>

            {/* Snack Section */}
            <div className="menu-category snack-section">
              <h3 className="category-title">Snack</h3>
              
              <div className="menu-item">
                <div className="item-info">
                  <h4>French Fries</h4>
                  <p>French Fries With Seasoning</p>
                </div>
                <span className="item-price">$15</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Waffle Sandwich Fries</h4>
                  <p>Tasty Sandwich With Sweet Cream & Cheese</p>
                </div>
                <span className="item-price">$20</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Chicken Wing</h4>
                  <p>Crispy Chicken Wing With Spicy Sauce</p>
                </div>
                <span className="item-price">$18</span>
              </div>

              <div className="menu-item">
                <div className="item-info">
                  <h4>Calamari Rings</h4>
                  <p>Crispy Squid Ring With Cream & Lemon</p>
                </div>
                <span className="item-price">$16</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="additional-services">
        <div className="services-container">
          <h2>Our Other Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-card-image">
                <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&w=400" alt="Spa & Wellness" />
              </div>
              <div className="service-card-content">
                <h3>Spa & Wellness</h3>
                <p>Relaxing spa treatments and wellness services for ultimate comfort.</p>
                <a href="#" className="service-link">Learn More →</a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-image">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&w=400" alt="Fitness Center" />
              </div>
              <div className="service-card-content">
                <h3>Fitness Center</h3>
                <p>State-of-the-art fitness equipment and personal training services.</p>
                <a href="#" className="service-link">Learn More →</a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-card-image">
                <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&w=400" alt="Event Spaces" />
              </div>
              <div className="service-card-content">
                <h3>Event Spaces</h3>
                <p>Perfect venues for weddings, conferences, and special events.</p>
                <a href="#" className="service-link">Learn More →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="service-footer">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <span className="footer-logo-icon">IH</span>
              <div>
                <h3>IMPERIAL</h3>
                <p>GRAND HOTEL</p>
              </div>
            </div>
            <p>Experience luxury and comfort like never before.</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/home">Home</Link></li>
              <li><a href="#about">About</a></li>
              <li><Link to="/service">Services</Link></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📍 123 Luxury Street, Hotel District</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>✉️ info@imperialhotel.com</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2025 Imperial Grand Hotel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default Service
