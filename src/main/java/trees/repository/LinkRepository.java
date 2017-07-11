package trees.repository;

import org.springframework.stereotype.Service;

import trees.domain.graph.Link;
import trees.domain.graph.Node;

@Service
public class LinkRepository extends AbstractRepository<Link>{

    public Iterable<Link> findByContenant(final Node node){
        final String query = "MATCH (n:Node)-[r:links]-(m:Node) WHERE ID(n) = {thingId} RETURN r,m";
        return session.query(Link.class, query, params("thingId", node.getId()));
    }


    public void deleteLink(final Long contenantId, final Long contenuId){
        final String query = "MATCH (n:Node)-[r:links]-(m:Node) WHERE ID(n) = {contenantId} AND ID(m) = {contenuId} DELETE r";
        session.query(query, params("contenantId", contenantId, "contenuId", contenuId));
    }


    @Override
    Class<Link> getEntityType() {
        return Link.class;
    }
}
