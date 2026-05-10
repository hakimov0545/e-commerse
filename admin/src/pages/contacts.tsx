import {
	Table,
	TableBody,
	TableCaption,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useGetAllContactsQuery } from "@/services/contact.api";

function ContactsPage() {
	const {
		data: contacts,
		isLoading,
		error,
	} = useGetAllContactsQuery();

	if (isLoading) return <p>Loading...</p>;
	if (error) {
		console.log(error);
		throw new Error("Error");
	}

	return (
		<div>
			<h1 className="text-xl font-bold mb-5">Contacts</h1>
			<Table>
				<TableCaption>Contacts</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-25">N</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Email</TableHead>
						<TableHead>Phone</TableHead>
						<TableHead>Message</TableHead>
						<TableHead>Created At</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{contacts?.map((contact, idx) => (
						<TableRow key={contact._id}>
							<TableHead className="w-25">
								{idx + 1}
							</TableHead>
							<TableHead>
								{contact.name || "-"}
							</TableHead>
							<TableHead>
								{contact.email || "-"}
							</TableHead>
							<TableHead>
								{contact.phone || "-"}
							</TableHead>
							<TableHead>
								{contact.message || "-"}
							</TableHead>
							<TableHead>
								{new Date(
									contact.createdAt,
								).toLocaleDateString()}
							</TableHead>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}

export default ContactsPage;
