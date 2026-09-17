import React, { useEffect, useState } from 'react'
import { Save } from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'
import { AdminPage, Field, MediaPicker } from '../../components/admin'

export default function HomepageEditor () {
  const {
    site,
    setSite,
    saveContent,
    uploadMedia,
    contentSaving,
    setToast
  } = useLibrary()

  const [draft, setDraft] = useState(site)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setDraft(site)
  }, [site])

  const update = (field, value) => {
    setDraft(current => ({
      ...current,
      [field]: value
    }))
  }

  const handleMediaChange = async (field, fileOrValue) => {
    if (typeof fileOrValue === 'string') {
      update(field, fileOrValue)
      return
    }

    if (!fileOrValue) {
      return
    }

    try {
      const result = await uploadMedia(fileOrValue)

      if (!result?.url) {
        throw new Error('Upload completed but no URL was returned.')
      }

      update(field, result.url)
      setToast('Media uploaded successfully')
    } catch (error) {
      console.error('Media upload failed:', error)
      setToast(
        error?.message || 'Media upload failed. Please try again.'
      )
    }
  }

  const save = async event => {
    event.preventDefault()
    setSaving(true)

    try {
      setSite(draft)

      await saveContent({
        site: draft
      })

      setToast('Homepage updated successfully')
    } catch (error) {
      console.error('Homepage save failed:', error)

      setToast(
        error?.message || 'Unable to save homepage changes.'
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminPage
      eyebrow='HOMEPAGE EDITOR'
      title='Manage homepage'
      description='Update the public library homepage without changing source code.'
    >
      <form className='editor-form' onSubmit={save}>

        {/* =========================
            01 — HERO CONTENT
        ========================== */}

        <div className='form-section-heading'>
          <span>01</span>

          <div>
            <h3>Hero content</h3>

            <p>
              Keep the first screen clear, institutional and welcoming.
            </p>
          </div>
        </div>

        <Field label='Hero title' required>
          <input
            value={draft.heroTitle || ''}
            onChange={e =>
              update('heroTitle', e.target.value)
            }
          />
        </Field>

        <Field label='Hero description'>
          <textarea
            rows='4'
            value={draft.heroSubtitle || ''}
            onChange={e =>
              update('heroSubtitle', e.target.value)
            }
          />
        </Field>


        {/* =========================
            02 — HOMEPAGE MEDIA
        ========================== */}

        <div className='form-section-heading'>
          <span>02</span>

          <div>
            <h3>Homepage media</h3>

            <p>
              Select files directly from your computer. Images and
              videos are stored permanently in Vercel Blob.
            </p>
          </div>
        </div>

        <div className='media-grid'>

          <MediaPicker
            label='Hero image'
            value={draft.heroImage || ''}
            onChange={value =>
              handleMediaChange('heroImage', value)
            }
            accept='image/png,image/jpeg,image/webp,image/avif'
            type='image'
          />

          <MediaPicker
            label='Library logo'
            value={draft.logo || ''}
            onChange={value =>
              handleMediaChange('logo', value)
            }
            accept='image/png,image/jpeg,image/webp,image/avif'
            type='image'
          />

          <MediaPicker
            label='Library tour video'
            value={draft.video || ''}
            onChange={value =>
              handleMediaChange('video', value)
            }
            accept='video/mp4,video/webm,video/ogg'
            type='video'
          />

        </div>


        {/* =========================
            03 — LIBRARY INFORMATION
        ========================== */}

        <div className='form-section-heading'>
          <span>03</span>

          <div>
            <h3>Library information</h3>

            <p>
              These details are shown on the public website and footer.
            </p>
          </div>
        </div>

        <div className='form-two'>

          <Field label='Phone'>
            <input
              value={draft.contactPhone || ''}
              onChange={e =>
                update('contactPhone', e.target.value)
              }
            />
          </Field>

          <Field label='Email'>
            <input
              value={draft.contactEmail || ''}
              onChange={e =>
                update('contactEmail', e.target.value)
              }
            />
          </Field>

        </div>

        <Field label='Address'>
          <textarea
            rows='3'
            value={draft.address || ''}
            onChange={e =>
              update('address', e.target.value)
            }
          />
        </Field>

        <Field label='About library'>
          <textarea
            rows='4'
            value={draft.about || ''}
            onChange={e =>
              update('about', e.target.value)
            }
          />
        </Field>


        {/* =========================
            04 — ABOUT US
        ========================== */}

        <div className='form-section-heading'>
          <span>04</span>

          <div>
            <h3>About Us</h3>

            <p>
              Manage the content displayed on the public About Us page.
            </p>
          </div>
        </div>

        <Field label='About Us title'>
          <input
            value={draft.aboutTitle || ''}
            onChange={e =>
              update('aboutTitle', e.target.value)
            }
          />
        </Field>

        <Field label='About Us description'>
          <textarea
            rows='5'
            value={draft.aboutDescription || ''}
            onChange={e =>
              update('aboutDescription', e.target.value)
            }
          />
        </Field>

        <Field label='Vision'>
          <textarea
            rows='4'
            value={draft.aboutVision || ''}
            onChange={e =>
              update('aboutVision', e.target.value)
            }
          />
        </Field>

        <Field label='Mission'>
          <textarea
            rows='4'
            value={draft.aboutMission || ''}
            onChange={e =>
              update('aboutMission', e.target.value)
            }
          />
        </Field>


        {/* =========================
            05 — FACULTY IN-CHARGE
        ========================== */}

        <div className='form-section-heading'>
          <span>05</span>

          <div>
            <h3>Faculty In-charge</h3>

            <p>
              Manage the Faculty In-charge information displayed
              on the public Contact Us page.
            </p>
          </div>
        </div>

        <div className='form-two'>

          <Field label='Faculty In-charge Name'>
            <input
              value={draft.facultyInchargeName || ''}
              onChange={e =>
                update(
                  'facultyInchargeName',
                  e.target.value
                )
              }
            />
          </Field>

          <Field label='Designation'>
            <input
              value={draft.facultyInchargeDesignation || ''}
              onChange={e =>
                update(
                  'facultyInchargeDesignation',
                  e.target.value
                )
              }
            />
          </Field>

        </div>

        <div className='form-two'>

          <Field label='Faculty Phone Number 1'>
            <input
              type='tel'
              value={draft.facultyInchargePhone1 || ''}
              onChange={e =>
                update(
                  'facultyInchargePhone1',
                  e.target.value
                )
              }
            />
          </Field>

          <Field label='Faculty Phone Number 2'>
            <input
              type='tel'
              value={draft.facultyInchargePhone2 || ''}
              onChange={e =>
                update(
                  'facultyInchargePhone2',
                  e.target.value
                )
              }
            />
          </Field>

        </div>


        {/* =========================
            SAVE
        ========================== */}

        <button
          type='submit'
          className='primary-btn'
          disabled={saving || contentSaving}
        >
          <Save size={16} />

          {saving || contentSaving
            ? 'Saving…'
            : 'Save homepage'}
        </button>

      </form>
    </AdminPage>
  )
}