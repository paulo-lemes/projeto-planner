import { useDialog } from "@/hooks/useDialog";
import { api } from "@/lib/axios";
import { ImportantLinksProps, Link } from "@/types";
import {
  handleDelete,
  iconStyle,
  inputIconStyle,
  inputModalStyle,
} from "@/utils";
import { Link2, Plus, Tag, Trash2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { Button } from "../Button";
import { InputModalWrapper } from "../InputModalWrapper";
import { Modal } from "../Modal";

export function ImportantLinks({ tripId }: ImportantLinksProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [createdLink, setCreatedLink] = useState(0);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  const { openDialog, closeDialog } = useDialog();

  useEffect(() => {
    api
      .get(`trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId, createdLink]);

  const handleCreateLink = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const title = data.get("title")?.toString();
    const url = data.get("url")?.toString();

    if (!title || !url) {
      openDialog("Preencha os campos para criar o link");
      return;
    }

    openDialog("loading");
    try {
      const response = await api.post(`/trips/${tripId}/links`, {
        url,
        title,
      });
      console.log(response);

      closeDialog();
      setCreatedLink((prev) => prev + 1);
      setIsCreateLinkModalOpen(false);
      openDialog("Link cadastrado com sucesso!");
    } catch (error) {
      console.log("Erro -" + error);
      openDialog("Ocorreu um erro ao cadastrar o link");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>

      {/* List of links */}
      <div className="space-y-5">
        {links.length > 0 ? (
          links.map(({ id, title, url }) => (
            <div key={id} className="flex items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="block font-medium text-neutral-100">
                  {title}
                </span>
                <a
                  href={url}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="block text-xs text-neutral-400 truncate hover:text-neutral-200"
                >
                  {url}
                </a>
              </div>
              <div className="shrink-0 flex gap-2">
                <a
                  href={url}
                  title={`link para ${title}`}
                  rel="noopener noreferrer"
                  target="_blank"
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <Link2 className={iconStyle} />
                </a>
                <button
                  type="button"
                  title="deletar link"
                  onClick={() =>
                    handleDelete(
                      "links",
                      id,
                      () => setCreatedLink((prev) => prev + 1),
                      () => openDialog("Ocorreu um erro ao deletar o link")
                    )
                  }
                  className="text-neutral-400 hover:text-neutral-200"
                >
                  <Trash2 className={iconStyle} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-500 text-sm">Nenhum link cadastrado.</p>
        )}
      </div>
      <Button
        variant="secondary"
        className="w-full"
        onClick={() => setIsCreateLinkModalOpen(true)}
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {/* Create link modal */}
      <Modal
        isModalOpen={isCreateLinkModalOpen}
        closeModal={() => setIsCreateLinkModalOpen(false)}
      >
        <div className="space-y-5 w-[540px] max-w-full">
          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Cadastrar link</h3>
            <p className="text-sm text-neutral-400">
              Todos convidados podem visualizar os links importantes.
            </p>
          </div>
          <form onSubmit={handleCreateLink} className="space-y-2">
            <InputModalWrapper>
              <Tag className={inputIconStyle} />
              <input
                name="title"
                placeholder="Título do link"
                className={inputModalStyle}
              />
            </InputModalWrapper>
            <InputModalWrapper>
              <Link2 className={inputIconStyle} />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className={inputModalStyle}
              />
            </InputModalWrapper>
            <Button type="submit" className="w-full !mt-4 h-11">
              Salvar atividade
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
