import { useEffect, FormEvent, useState } from "react";
import { api } from "@/lib/axios";
import { inputIconStyle } from "@/utils";
import { Button } from "../Button";
import { Modal } from "../Modal";
import { Link2, Plus, Tag } from "lucide-react";

interface ImportantLinksProps {
  tripId?: string;
}

interface Link {
  id: string;
  title: string;
  url: string;
}

export function ImportantLinks({ tripId }: ImportantLinksProps) {
  const [links, setLinks] = useState<Link[]>([]);
  const [createdLink, setCreatedLink] = useState(0);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

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
      alert("Preencha os campos para criar o link");
      return;
    }

    try {
      const response = await api.post(`/trips/${tripId}/links`, {
        url,
        title,
      });
      console.log(response);

      setCreatedLink((prev) => prev + 1);
      setIsCreateLinkModalOpen(false);
    } catch (error) {
      console.log("Erro -" + error);
      alert("Ocorreu um erro ao cadastrar o link. Tente novamente.");
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
                  className="block text-xs text-neutral-400 truncate hover:text-neutral-200"
                >
                  {url}
                </a>
              </div>
              <Link2 className="text-neutral-400 size-5 shrink-0" />
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
            <div className="h-14 px-4 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center gap-1">
              <Tag className={inputIconStyle} />
              <input
                name="title"
                placeholder="Título do link"
                className="bg-transparent text-lg placeholder-neutral-400 outline-none flex-1 rounded-md pl-1"
              />
            </div>
            <div className="h-14 flex-1 px-4 bg-neutral-950 border border-neutral-800 rounded-lg flex items-center gap-1">
              <Link2 className={inputIconStyle} />
              <input
                type="text"
                name="url"
                placeholder="URL"
                className="bg-transparent text-lg placeholder-neutral-400 outline-none flex-1 rounded-md pl-1"
              />
            </div>
            <Button type="submit" className="w-full">
              Salvar atividade
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
