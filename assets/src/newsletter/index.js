import "./index.scss"
import { TextControl, TextareaControl } from '@wordpress/components';

wp.blocks.registerBlockType("wp-sms-blocks/newsletter", {
  title: "Newsletter",
  icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.74086 17.5785C6.35715 17.5785 6.04673 17.8971 6.04673 18.2882C6.04673 18.6814 6.35715 19 6.74086 19V17.5785ZM21.9903 18.2882V19C22.3438 19 22.6391 18.7298 22.6801 18.3716L21.9903 18.2882ZM23.3052 6.70965L23.9951 6.79314C24.0188 6.59101 23.9563 6.38888 23.8248 6.23728C23.6933 6.08569 23.5036 6 23.3052 6V6.70965ZM8.84482 6.70965V6C8.56458 6 8.31021 6.17357 8.20458 6.43941C8.0968 6.70306 8.155 7.01065 8.35333 7.21278L8.84482 6.70965ZM15.1545 13.1734L14.6652 13.6743C14.911 13.927 15.3033 13.9534 15.5792 13.7336L15.1545 13.1734ZM3.06109 9.49992C2.67738 9.49992 2.36696 9.81849 2.36696 10.2118C2.36696 10.6028 2.67738 10.9214 3.06109 10.9214V9.49992ZM8.05584 10.9214C8.43955 10.9214 8.74997 10.6028 8.74997 10.2118C8.74997 9.81849 8.43955 9.49992 8.05584 9.49992V10.9214ZM0.694134 11.9233C0.31042 11.9233 0 12.2418 0 12.6351C0 13.0262 0.31042 13.3448 0.694134 13.3448V11.9233ZM10.4228 13.3448C10.8044 13.3448 11.1169 13.0262 11.1169 12.6351C11.1169 12.2418 10.8044 11.9233 10.4228 11.9233V13.3448ZM12.2638 16.0362C12.6453 16.0362 12.9557 15.7198 12.9557 15.3265C12.9557 14.9354 12.6453 14.6169 12.2638 14.6169V16.0362ZM4.37391 14.6169C3.99235 14.6169 3.68193 14.9354 3.68193 15.3265C3.68193 15.7198 3.99235 16.0362 4.37391 16.0362V14.6169ZM6.74086 19H21.9903V17.5785H6.74086V19ZM22.6801 18.3716L23.9951 6.79314L22.6176 6.62836L21.3026 18.2069L22.6801 18.3716ZM23.3052 6H8.84482V7.4215H23.3052V6ZM8.35333 7.21278L14.6652 13.6743L15.646 12.6703L9.33417 6.20872L8.35333 7.21278ZM15.5792 13.7336L23.7299 7.2721L22.8806 6.1494L14.7299 12.611L15.5792 13.7336ZM3.06109 10.9214H8.05584V9.49992H3.06109V10.9214ZM0.694134 13.3448H10.4228V11.9233H0.694134V13.3448ZM12.2638 14.6169H4.37391V16.0362H12.2638V14.6169Z" fill="#F88E40"/></svg>,
  category: "wp-sms-blocks",
  attributes: {
    title: { type: 'string' },
    description: { type: 'string' },
  },
  example: {
    attributes: {
      cover: 'https://wp-sms-pro.com/wp-content/uploads/2022/01/newsletter-form.png',
    },
  },
  edit: EditComponent,
  save: function () {
    return null
  }
})

function EditComponent(props) {
  return (
    <div className="wp-sms-block">
      <h2 className="wp-sms-block__title">Newsletter</h2>
      <div className="wp-sms-block__main">
        <TextControl
          label="Title"
          value={ props.attributes.title }
          onChange={ (e) => {props.setAttributes( {title: e})} }
        />
        <TextareaControl
          label="Description"
          value={ props.attributes.description }
          onChange={ (e) => {props.setAttributes( {description: e})} }
        />
      </div>
    </div>
  )
}
