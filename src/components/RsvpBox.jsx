import React, { useState } from 'react';
import { Check, Heart, Send, User } from 'lucide-react';
import { submitWeddingForm } from '../services/weddingApi';

export default function RsvpBox({
  titleText = 'Xác nhận tham dự',
  subtitleText = 'Hãy xác nhận sự có mặt của Quý Khách để gia đình chúng tôi chuẩn bị đón tiếp chu đáo nhất!',
  buttonColor = '#5D041E',
  buttonTextColor = '#ffffff'
}) {
  const [fullName, setFullName] = useState('');
  const [guestSide, setGuestSide] = useState('Nhà trai');
  const [willAttend, setWillAttend] = useState('yes');
  const [attendeeCount, setAttendeeCount] = useState(1);
  const [wishes, setWishes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!fullName.trim()) {
            setError('Vui lòng nhập họ và tên của bạn');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            await submitWeddingForm({
                action: 'rsvp',
                name: fullName.trim(),
                guestSide,
                attendance: willAttend,
                numOfGuests: String(attendeeCount),
                message: wishes.trim()
            });

            setIsSubmitted(true);
        } catch (error) {
            setError('Không thể gửi xác nhận. Vui lòng thử lại.');
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <div
      className={'rsvp-box'}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        border: '1px solid #eae5df',
        boxShadow: '0 12px 40px rgba(93, 4, 30, 0.12)',
        padding: '24px 22px',
        display: 'flex',
        flexDirection: 'column',
        boxSizing: 'border-box',
        fontFamily: 'Lora, serif',
        color: '#2d2d2d'
      }}
    >
      {isSubmitted ? (
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '24px 10px'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#5D041E',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              boxShadow: '0 4px 16px rgba(93, 4, 30, 0.3)'
            }}
          >
            <Check size={36} strokeWidth={2.5} />
          </div>
          <h3
            style={{
              fontSize: '21px',
              fontWeight: 700,
              color: '#5D041E',
              marginBottom: '8px'
            }}
          >
            Gửi xác nhận thành công!
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: '#555',
              lineHeight: 1.6,
              maxWidth: '320px',
              marginBottom: '20px'
            }}
          >
            Cảm ơn <strong>{fullName}</strong> ({guestSide}){' '}
            {willAttend === 'yes' ? (
              <span>
                sẽ tham dự cùng <strong>{attendeeCount}</strong> người! Chúng mình rất mong chờ được đón tiếp bạn!
              </span>
            ) : (
              <span>đã phản hồi lời mời của chúng mình! Chúc bạn nhiều sức khỏe và niềm vui!</span>
            )}
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setFullName('');
              setWishes('');
            }}
            style={{
              padding: '9px 24px',
              backgroundColor: 'transparent',
              border: '1px solid #5D041E',
              color: '#5D041E',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            Gửi phản hồi khác
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            height: '100%',
            justifyContent: 'space-between'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <h3
              style={{
                fontSize: '22px',
                fontWeight: 700,
                color: '#5D041E',
                letterSpacing: '0.5px'
              }}
            >
              {titleText}
            </h3>
            {subtitleText && (
              <p
                style={{
                  fontSize: '12.5px',
                  color: '#666',
                  marginTop: '4px',
                  lineHeight: 1.4,
                  maxWidth: '360px',
                  margin: '4px auto 0'
                }}
              >
                {subtitleText}
              </p>
            )}
            <div
              style={{
                width: '40px',
                height: '2px',
                backgroundColor: '#5D041E',
                margin: '8px auto 0'
              }}
            />
          </div>

          {/* Full Name */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#444',
                marginBottom: '4px'
              }}
            >
              Họ và tên <span style={{ color: '#d32f2f' }}>*</span>
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Nhập họ và tên của bạn"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '9px 12px 9px 34px',
                  borderRadius: '6px',
                  border: error ? '1px solid #d32f2f' : '1px solid #dcd7ce',
                  fontSize: '13.5px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  backgroundColor: '#fbfaf8'
                }}
              />
              <User
                size={16}
                color="#888"
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              />
            </div>
            {error && (
              <span style={{ fontSize: '11.5px', color: '#d32f2f', marginTop: '3px', display: 'block' }}>
                {error}
              </span>
            )}
          </div>

          {/* Which side */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#444',
                marginBottom: '5px'
              }}
            >
              Bạn là khách của:
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              {['Nhà trai', 'Nhà gái'].map((side) => (
                <button
                  type="button"
                  key={side}
                  onClick={() => setGuestSide(side)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: guestSide === side ? '2px solid #5D041E' : '1px solid #dcd7ce',
                    backgroundColor: guestSide === side ? '#fff5f7' : '#ffffff',
                    color: guestSide === side ? '#5D041E' : '#555',
                    fontWeight: guestSide === side ? 700 : 500,
                    fontSize: '13px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: 'inherit'
                  }}
                >
                  {side}
                </button>
              ))}
            </div>
          </div>

          {/* Attendance */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#444',
                marginBottom: '5px'
              }}
            >
              Bạn sẽ tham dự chứ?
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="attend"
                  checked={willAttend === 'yes'}
                  onChange={() => setWillAttend('yes')}
                  style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#5D041E' }}
                />
                <span>Có, tôi sẽ tham dự</span>
              </label>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="attend"
                  checked={willAttend === 'no'}
                  onChange={() => setWillAttend('no')}
                  style={{ cursor: 'pointer', width: '15px', height: '15px', accentColor: '#5D041E' }}
                />
                <span>Tôi bận, rất tiếc không thể tham dự</span>
              </label>
            </div>
          </div>

          {/* Attendee Count */}
          {willAttend === 'yes' && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label
                style={{
                  fontSize: '12.5px',
                  fontWeight: 600,
                  color: '#444'
                }}
              >
                Số lượng người tham dự:
              </label>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #dcd7ce',
                  borderRadius: '6px',
                  padding: '2px 8px',
                  backgroundColor: '#fbfaf8'
                }}
              >
                <button
                  type="button"
                  onClick={() => setAttendeeCount(Math.max(1, attendeeCount - 1))}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#5D041E',
                    padding: '2px 6px'
                  }}
                >
                  -
                </button>
                <span style={{ fontSize: '13.5px', fontWeight: 700, minWidth: '20px', textAlign: 'center' }}>
                  {attendeeCount}
                </span>
                <button
                  type="button"
                  onClick={() => setAttendeeCount(attendeeCount + 1)}
                  style={{
                    border: 'none',
                    background: 'none',
                    fontSize: '16px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    color: '#5D041E',
                    padding: '2px 6px'
                  }}
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Wishes */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '12.5px',
                fontWeight: 600,
                color: '#444',
                marginBottom: '4px'
              }}
            >
              Lời chúc gửi tới cặp đôi:
            </label>
            <div style={{ position: 'relative' }}>
              <textarea
                placeholder="Gửi lời chúc phúc tốt đẹp nhất..."
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                rows={2}
                style={{
                  width: '100%',
                  padding: '7px 10px',
                  borderRadius: '6px',
                  border: '1px solid #dcd7ce',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                  resize: 'none',
                  backgroundColor: '#fbfaf8'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '11px',
              borderRadius: '6px',
              backgroundColor: buttonColor,
              color: buttonTextColor,
              border: 'none',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(93, 4, 30, 0.3)',
              transition: 'background-color 0.2s',
              fontFamily: 'inherit',
              marginTop: '4px'
            }}
          >
            {isSubmitting ? (
              <span>Đang gửi...</span>
            ) : (
              <>
                <Send size={15} />
                <span>Gửi xác nhận</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
