import React from 'react';

class ContentSection extends React.PureComponent<any, any> {

   constructor(props: any) {
      super(props);
   }

   public render() {
      const style = this.props.styling;

      return (
         <article className={style.content}>
            <div >
               
            </div>
            {/* <h2>Some Header</h2>
            <br></br>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Ultricies mi eget mauris pharetra. Sed nisi lacus sed viverra tellus in hac habitasse platea. Ultrices tincidunt arcu non sodales neque sodales. Purus in massa tempor nec feugiat nisl pretium. Hac habitasse platea dictumst vestibulum rhoncus est. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Scelerisque felis imperdiet proin fermentum leo vel. At imperdiet dui accumsan sit amet nulla facilisi morbi tempus. Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget. Sed elementum tempus egestas sed. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Venenatis urna cursus eget nunc scelerisque. Sed odio morbi quis commodo odio aenean sed adipiscing. Fermentum leo vel orci porta non pulvinar neque.</p>
            <br></br>
            <p>Tempus iaculis urna id volutpat lacus. Fames ac turpis egestas sed. Adipiscing diam donec adipiscing tristique. Nulla at volutpat diam ut venenatis tellus in. Scelerisque purus semper eget duis at tellus. Imperdiet dui accumsan sit amet. Pretium lectus quam id leo. Diam maecenas ultricies mi eget mauris pharetra et ultrices neque. Dignissim enim sit amet venenatis urna cursus. Tristique risus nec feugiat in fermentum posuere urna.</p>
            <br></br>

            <table className='params-table'>
               <tr>
                  <th>Param</th>
                  <th>Default</th>
                  <th>Description</th>
               </tr>
               <tr>
                  <td>Peter</td>
                  <td>Griffin</td>
                  <td>Griffin</td>
               </tr>
               <tr>
                  <td>Lois</td>
                  <td>Griffin</td>
                  <td>Griffin</td>
               </tr>
            </table> */}
         </article>
      );
   }
} 

export default ContentSection;