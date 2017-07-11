package trees.repository;

import static java.util.Collections.emptyMap;

import org.neo4j.ogm.model.Result;
import org.neo4j.ogm.session.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminRepository {

    @Autowired
    protected Session session;

    public Result deleteAll(){
        return run("MATCH (n) DETACH DELETE n");
    }

    public Result listAll() {
        return run("MATCH (n) OPTIONAL MATCH (n)-[r]-() RETURN n,r LIMIT 100");
    }

    private Result run(final String query) {
        return session.query(query,emptyMap());
    }
}
