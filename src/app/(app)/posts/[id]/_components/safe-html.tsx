import DOMPurify from "isomorphic-dompurify";

const SafeHtml = ({ html }: { html: string }) => {
  return <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />;
};

export default SafeHtml;
