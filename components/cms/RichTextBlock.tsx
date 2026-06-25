import React from "react";
import styles from "./RichTextBlock.module.css";

interface RichTextBlockProps {
  fields: {
    content?: { value: string };
  };
}

/**
 * SERVER COMPONENT: RichTextBlock
 *
 * Por que este é um Server Component?
 * 1. Exibe conteúdo HTML puro e estático injetado pelo marketing no CMS.
 * 2. Não possui gerenciamento de estado interno no cliente nem interações dinâmicas complexas.
 */
export default function RichTextBlock({ fields }: RichTextBlockProps) {
  const content = fields?.content?.value;

  if (!content) return null;

  return <div className={styles.richText} dangerouslySetInnerHTML={{ __html: content }} />;
}
